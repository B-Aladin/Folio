import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserPlan } from '@/lib/subscription.server';
import { PLAN_LIMITS } from '@/lib/subscription-constants';

const SubscriptionsPage = async () => {
    const { userId } = await auth();
    
    if (!userId) {
        redirect('/sign-in');
    }

    const plan = await getUserPlan();
    const limits = PLAN_LIMITS[plan];

    return (
        <div className="container mx-auto py-20 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-[#8B7355]">Your Subscription</h1>
            
            <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-[#8B7355]/20 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-[#8B7355]/60 font-semibold">Current Plan</p>
                        <h2 className="text-3xl font-bold capitalize text-[#4A3728]">{plan}</h2>
                    </div>
                    <div className="bg-[#8B7355]/10 px-4 py-2 rounded-full border border-[#8B7355]/20">
                        <span className="text-[#8B7355] font-semibold">Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-4 rounded-xl bg-white border border-[#8B7355]/10">
                        <p className="text-sm text-[#8B7355]/60">Monthly Book Limit</p>
                        <p className="text-2xl font-bold text-[#4A3728]">{limits.maxBooksPerMonth} Books</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-[#8B7355]/10">
                        <p className="text-sm text-[#8B7355]/60">Max File Size</p>
                        <p className="text-2xl font-bold text-[#4A3728]">{limits.maxFileSizeMB} MB</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[#8B7355]/80 mb-6">
                        Looking to upgrade your limits? Pro plans coming soon.
                    </p>
                    <button className="bg-[#8B7355] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#705C42] transition-colors disabled:opacity-50" disabled>
                        Upgrade Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
