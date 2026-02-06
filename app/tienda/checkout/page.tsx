import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CheckoutClient } from "@/components/tienda/checkout-client"

export const dynamic = "force-dynamic"

export default async function CheckoutPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login?returnUrl=/tienda/checkout")
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <CheckoutClient user={user} />
            </div>
        </div>
    )
}
