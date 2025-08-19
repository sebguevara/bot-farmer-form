import { QueryPayload } from "./form";

export const FieldRow = ({ children }: { children: React.ReactNode }) => (
    <div className="flex gap-2">{children}</div>
);

export const Helper = ({ text }: { text: string }) => (
    <p className="text-xs text-muted-foreground mt-1">{text}</p>
);

export const PayloadPreview = ({ payload }: { payload?: QueryPayload }) => {
    if (!payload) return null;
    return (
        <pre className="mt-4 text-xs bg-muted/40 p-3 rounded-xl overflow-auto" aria-label="payload-preview">
            {JSON.stringify(payload, null, 2)}
        </pre>
    );
};
