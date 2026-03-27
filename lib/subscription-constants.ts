export type PlanType = 'free' | 'pro' | 'unlimited';

export const PLANS: Record<string, PlanType> = {
    FREE: 'free',
    PRO: 'pro',
    UNLIMITED: 'unlimited',
};

export interface PlanLimits {
    maxBooks: number;
    maxSessionsPerMonth: number;
    maxDurationPerSession: number; // in minutes
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
    [PLANS.FREE]: {
        maxBooks: 2,
        maxSessionsPerMonth: 10,
        maxDurationPerSession: 15,
    },
    [PLANS.PRO]: {
        maxBooks: 20,
        maxSessionsPerMonth: 100,
        maxDurationPerSession: 60,
    },
    [PLANS.UNLIMITED]: {
        maxBooks: 1000,
        maxSessionsPerMonth: 10000,
        maxDurationPerSession: 240,
    },
};

/**
 * Returns the start of the current billing month (UTC).
 * For a simple implementation, this returns the first day of the current month.
 */
export const getCurrentBillingPeriodStart = (): Date => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
};
