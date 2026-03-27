'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { PLANS, PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

export const useSubscription = () => {
    return {
        plan: PLANS.DEFAULT,
        limits: PLAN_LIMITS[PLANS.DEFAULT],
        isLoaded: true
    };
};