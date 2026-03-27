"use client";

import React from 'react';
import { VoiceSelectorProps } from '@/types';
import { voiceOptions, voiceCategories } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Check, Volume2 } from 'lucide-react';

const VoiceSelector = ({ value, onChange, disabled }: VoiceSelectorProps) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(voiceOptions).map(([key, voice]) => {
                    const isSelected = value === key;
                    
                    return (
                        <div
                            key={key}
                            onClick={() => !disabled && onChange(key)}
                            className={cn(
                                "voice-selector-option group relative",
                                isSelected ? "voice-selector-option-selected" : "voice-selector-option-default",
                                disabled && "voice-selector-option-disabled"
                            )}
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                        isSelected ? "bg-[#212a3b] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                    )}>
                                        <Volume2 size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className={cn(
                                            "font-bold text-lg leading-tight",
                                            isSelected ? "text-[#212a3b]" : "text-gray-700"
                                        )}>
                                            {voice.name}
                                        </p>
                                        <p className="text-sm text-gray-500 line-clamp-1">
                                            {voice.description}
                                        </p>
                                    </div>
                                </div>
                                {isSelected && (
                                    <div className="bg-[#212a3b] rounded-full p-1 text-white">
                                        <Check size={14} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VoiceSelector;
