'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon } from 'lucide-react';
import { UploadSchema } from '@/lib/zod';
import { BookUploadFormValues } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, DEFAULT_VOICE } from '@/lib/constants';
import FileUploader from './FileUploader';
import VoiceSelector from './VoiceSelector';
import LoadingOverlay from './LoadingOverlay';
import {useAuth, useUser} from "@clerk/nextjs";
import {toast} from 'sonner';
import {checkBookExists, createBook, saveBookSegments} from "@/lib/actions/book.actions";
import {useRouter} from "next/navigation";
import {parsePDFFile} from "@/lib/utils";
import {upload} from "@vercel/blob/client";

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useAuth();
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);
        console.log('UploadForm mounted');
    }, []);

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
        mode: 'onSubmit',
    });

    const onSubmit = async (data: BookUploadFormValues) => {
        console.log('Starting form submission with data:', data);
        if(!userId) {
            toast.error("Please login to upload books");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Checking if book exists:', data.title);
            const existsCheck = await checkBookExists(data.title);

            if(existsCheck.exists && existsCheck.book) {
                console.log('Book already exists, redirecting to slug:', existsCheck.book.slug);
                toast.info("Book with same title already exists.");
                form.reset();
                router.push(`/books/${existsCheck.book.slug}`);
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
            const pdfFile = data.pdfFile;

            console.log('Parsing PDF file...');
            const parsedPDF = await parsePDFFile(pdfFile);

            if(!parsedPDF.content || parsedPDF.content.length === 0) {
                console.error('PDF parsing returned no content');
                toast.error("Failed to parse PDF. Please try again with a different file.");
                return;
            }

            console.log('Uploading PDF to Vercel Blob...');
            const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf'
            });

            let coverUrl: string;

            if(data.coverImage) {
                console.log('Uploading custom cover image...');
                const coverFile = data.coverImage;
                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, coverFile, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: coverFile.type
                });
                coverUrl = uploadedCoverBlob.url;
            } else {
                console.log('Uploading auto-generated PDF cover...');
                const response = await fetch(parsedPDF.cover);
                const blob = await response.blob();

                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: 'image/png'
                });
                coverUrl = uploadedCoverBlob.url;
            }

            console.log('Creating book record in database...');
            const bookResult = await createBook({
                clerkId: userId,
                title: data.title,
                author: data.author,
                persona: data.persona,
                fileURL: uploadedPdfBlob.url,
                fileBlobKey: uploadedPdfBlob.pathname,
                coverURL: coverUrl,
                fileSize: pdfFile.size,
            });

            if(!bookResult.success) {
                console.error('Failed to create book:', bookResult.error);
                toast.error(bookResult.error as string || "Failed to create book");
                if (bookResult.isBillingError) {
                    router.push("/subscriptions");
                }
                return;
            }

            if(bookResult.alreadyExists) {
                console.log('Book already exists (handled during creation), redirecting...');
                toast.info("Book with same title already exists.");
                form.reset();
                router.push(`/books/${bookResult.data.slug}`);
                return;
            }

            console.log('Saving book segments...');
            const segmentsResult = await saveBookSegments(bookResult.data._id, userId, parsedPDF.content);

            if(!segmentsResult.success) {
                console.error('Failed to save book segments:', segmentsResult.error);
                toast.error("Failed to save book segments");
                return;
            }

            console.log('Upload process complete, redirecting to book page.');
            toast.success("Book synthesized successfully!");
            router.push(`/books/${bookResult.data.slug}`);
        } catch (error) {
            console.error('Critical error during book synthesis:', error);
            toast.error("Something went wrong while synthesizing your book.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return null;

    return (
        <>
            {isSubmitting && <LoadingOverlay />}

            <div className="new-book-wrapper">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                        console.error('Form validation failed:', errors);
                        toast.error("Please fill in all required fields correctly.");
                    })} className="space-y-8">
                        {/* 1. PDF File Upload */}
                        <FileUploader
                            control={form.control}
                            name="pdfFile"
                            label="Book PDF File"
                            acceptTypes={ACCEPTED_PDF_TYPES}
                            icon={Upload}
                            placeholder="Click to upload PDF"
                            hint="PDF file (max 50MB)"
                            disabled={isSubmitting}
                        />

                        {/* 2. Cover Image Upload */}
                        <FileUploader
                            control={form.control}
                            name="coverImage"
                            label="Cover Image (Optional)"
                            acceptTypes={ACCEPTED_IMAGE_TYPES}
                            icon={ImageIcon}
                            placeholder="Click to upload cover image"
                            hint="Leave empty to auto-generate from PDF"
                            disabled={isSubmitting}
                        />

                        {/* 3. Title Input */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Rich Dad Poor Dad"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 4. Author Input */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Author Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Robert Kiyosaki"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 5. Voice Selector */}
                        <FormField
                            control={form.control}
                            name="persona"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                    <FormControl>
                                        <VoiceSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 6. Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="form-btn shadow-soft-md active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Synthesizing...' : 'Begin Synthesis'}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default UploadForm;