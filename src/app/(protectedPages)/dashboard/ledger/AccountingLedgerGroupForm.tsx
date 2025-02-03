'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

export default function AccountingLedgerForm({ setshowAccountingLedgerFrom }:any) {
    const { register, handleSubmit } = useForm();
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [ledgerActive, setLedgerActive] = useState(false);
    const [formData, setFormData] = useState({
        salesGroup: false,
        purchaseGroup: false,
        salaryGroup: false,
        bankReconciliation: false
    });

    const translations = {
        en: {
            title: 'Accounting Ledger Groups',
            groupId: 'Account Group ID',
            accountGroup: 'Account Group',
            accountMaster: 'Account Master',
            options: {
                sales: 'Sales Group',
                purchase: 'Purchase Group',
                salary: 'Salary Payable Group',
                bank: 'Bank Reconciliation'
            },
            save: 'Save',
            close: 'Close'
        },
        ar: {
            title: 'مجموعات الدفاتر المحاسبية',
            groupId: 'رقم',
            accountGroup: 'اسم مجموعة الحساب',
            accountMaster: 'جماعة حساب',
            options: {
                sales: 'مجموعة المبيعات',
                purchase: 'مجموعة الشراء',
                salary: 'مجموعة الرواتب المستحقة',
                bank: 'تسوية الحسابات المصرفية'
            },
            save: 'حفظ',
            close: 'إغلاق'
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <main className="container mx-auto px-4 ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                className="space-y-6"
            >
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">
                        {translations[language].title}
                    </h2>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={toggleLanguage}
                        className="gap-2"
                    >
                        <i className="fas fa-language"></i>
                        {language === 'en' ? 'العربية' : 'English'}
                    </Button>
                </div>

                {/* Main Form Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* English Column */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="groupId">
                                {translations[language].groupId}
                            </Label>
                            <Input
                                id="groupId"
                                disabled
                                {...register('groupId')}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="accountGroup">
                                {translations[language].accountGroup}
                            </Label>
                            <Input
                                id="accountGroup"
                                {...register('accountGroup')}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="accountMaster">
                                {translations[language].accountMaster}
                            </Label>
                            <Input
                                id="accountMaster"
                                {...register('accountMaster')}
                            />
                        </div>
                    </div>

                    {/* Arabic Column */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="groupIdAr">
                                {translations[language].groupId}
                            </Label>
                            <Input
                                id="groupIdAr"
                                disabled
                                {...register('groupIdAr')}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="accountGroupAr">
                                {translations[language].accountGroup}
                            </Label>
                            <Input
                                id="accountGroupAr"
                                {...register('accountGroupAr')}
                                className={language === 'ar' ? 'text-right' : ''}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="accountMasterAr">
                                {translations[language].accountMaster}
                            </Label>
                            <Input
                                id="accountMasterAr"
                                {...register('accountMasterAr')}
                                className={language === 'ar' ? 'text-right' : ''}
                            />
                        </div>
                    </div>
                </div>

                {/* Checkbox Groups */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Checkbox
                                id="salesGroup"
                                {...register('salesGroup')}
                            />
                            <Label htmlFor="salesGroup">
                                {translations[language].options.sales}
                            </Label>
                        </div>

                        <div className="flex items-center gap-4">
                            <Checkbox
                                id="purchaseGroup"
                                {...register('purchaseGroup')}
                            />
                            <Label htmlFor="purchaseGroup">
                                {translations[language].options.purchase}
                            </Label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Checkbox
                                id="salaryGroup"
                                {...register('salaryGroup')}
                            />
                            <Label htmlFor="salaryGroup">
                                {translations[language].options.salary}
                            </Label>
                        </div>

                        <div className="flex items-center gap-4">
                            <Checkbox
                                id="bankReconciliation"
                                {...register('bankReconciliation')}
                            />
                            <Label htmlFor="bankReconciliation">
                                {translations[language].options.bank}
                            </Label>
                        </div>
                    </div>
                </div>

                {/* Status Section */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                        <Label className="text-sm font-medium">
                            {language === 'en' ? 'Ledger Status' : 'حالة الدفتر'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            {ledgerActive ?
                                (language === 'en' ? 'Active' : 'نشط') :
                                (language === 'en' ? 'Inactive' : 'غير نشط')}
                        </p>
                    </div>
                    <Switch
                        checked={ledgerActive}
                        onCheckedChange={setLedgerActive}
                    />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="destructive" onClick={() => setshowAccountingLedgerFrom(false)}>
                        {translations[language].close}
                    </Button>
                    <Button type="submit" variant="outline">
                        {translations[language].save}
                    </Button>
                </div>
            </form>
        </main>
    );
}