// types.ts
export interface Account {
    AccountId: string;
    AccountHead: string;
    ReferenceNo?: string;
    MasterGroup: string;
}

export interface Voucher {
    VoucherNo: string;
    VoucherDate: string;
    AccountHead: string;
    AccountHeadName: string;
    DrAmount: number;
    CrAmount: number;
    VoucherType: string;
    VoucherEffectiveDate: string;
    MasterGroup?: string;
}

export const columnDefinitions = [
    { key: "VoucherNo", label: "Voucher Number" },
    { key: "VoucherDate", label: "Voucher Date" },
    { key: "AccountHeadName", label: "Account Name" },
    { key: "DrAmount", label: "Debit Amount" },
    { key: "CrAmount", label: "Credit Amount" },
    { key: "VoucherType", label: "Voucher Type" },
    { key: "VoucherEffectiveDate", label: "Effective Date" },
] as const;