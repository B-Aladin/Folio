import {auth} from "@clerk/nextjs/server";
import {PLANS, PLAN_LIMITS, PlanType} from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
    return PLANS.DEFAULT;
}

export const getPlanLimits = async () => {
    const plan = await getUserPlan();
    return PLAN_LIMITS[plan];
}