import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link href="/prepare" className="mb-8 inline-flex items-center gap-1.5 text-xs text-stone transition-colors hover:text-ink">
        <ArrowLeft size={14} />
        Back to Prepare
      </Link>

      <h1 className="text-3xl font-[450] tracking-tight">Payment Guide</h1>
      <p className="mt-3 text-sm text-stone">
        China is mostly cashless. Here&apos;s how to pay for everything.
      </p>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-black/5 bg-surface-card p-6">
          <h2 className="text-base font-semibold">💳 Alipay</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone">
            The most widely accepted payment method. You can now bind
            international Visa/Mastercard/Amex cards directly.
          </p>
          <div className="mt-4 rounded-xl bg-white/50 p-4 text-sm">
            <p className="font-medium">How to set up:</p>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-stone">
              <li>Download Alipay from App Store / Google Play</li>
              <li>Register with your foreign phone number</li>
              <li>Go to Me → Cards → Add international card</li>
              <li>Done. You can now scan to pay anywhere</li>
            </ol>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-surface-card p-6">
          <h2 className="text-base font-semibold">💳 WeChat Pay</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone">
            Also very popular, especially outside major cities. Similar setup
            process to Alipay with international card support.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-surface-card p-6">
            <h3 className="text-sm font-semibold">🏦 International Credit Cards</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Accepted at most hotels, large restaurants, and shopping malls.
              Not accepted at street food stalls or small shops.
            </p>
          </div>
          <div className="rounded-2xl border border-osmanthus/20 bg-osmanthus/5 p-6">
            <h3 className="text-sm font-semibold">💵 Cash</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Always carry ¥500-1000 for emergencies. ATMs at airports accept
              international cards. Bank of China branches are most reliable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
