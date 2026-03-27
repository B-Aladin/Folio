"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="loading-wrapper animate-in fade-in duration-300">
            <div className="loading-shadow-wrapper bg-white shadow-soft-lg">
                <div className="loading-shadow">
                    <div className="relative">
                        <Loader2 className="loading-animation text-[#212a3b] w-16 h-16" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-[#212a3b]/10 rounded-full animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="text-center space-y-3">
                        <h3 className="loading-title">Synthesizing Book</h3>
                        <p className="text-gray-500 max-w-[280px] mx-auto text-lg">
                            We're parsing your PDF and preparing your AI voice assistant...
                        </p>
                    </div>

                    <div className="loading-progress">
                        <div className="loading-progress-item">
                            <span className="loading-progress-status" />
                            <span className="text-[#3d485e] font-medium">Extracting text segments</span>
                        </div>
                        <div className="loading-progress-item opacity-50">
                            <span className="w-2 h-2 bg-gray-300 rounded-full" />
                            <span className="text-gray-400">Storing for conversation</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
