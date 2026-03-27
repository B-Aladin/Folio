import { auth } from "@clerk/nextjs/server";
import { PlanType, PLANS } from "@/lib/subscription-constants";

/**
 * Retrieves the current user's subscription plan.
 * For now, this logic can be expanded based on Clerk metadata, Stripe, or Database field.
 */
export async function getUserPlan(): Promise<PlanType> {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        return PLANS.FREE;
    }

    // Example logic using Clerk publicMetadata:
    // If you have a subscription field in user metadata, you can read it here.
    const metadata = sessionClaims?.metadata as { subscriptionPlan?: PlanType } | undefined;
    
    if (metadata?.subscriptionPlan && Object.values(PLANS).includes(metadata.subscriptionPlan)) {
        return metadata.subscriptionPlan;
    }

    // Default to FREE if no specific plan is found
    return PLANS.FREE;
}
