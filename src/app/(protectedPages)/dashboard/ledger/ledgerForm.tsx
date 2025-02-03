'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import CustomInput, { OptionType } from '@/components/CustomInput'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'
import AccountingLedgerForm from './AccountingLedgerGroupForm'

const formSchema = z.object({
    accountId: z.string(),
    referenceNo: z.string(),
    accountHead: z.string().min(1, "Account Head is required"),
    accountGroup: z.string().min(1, "Account Group is required"),
    openingBalance: z.number(),
    creditDebit: z.string(),
    // Add more validations for other fields
});

const accountGroups: OptionType[] = [
    { value: 'assets', label: 'Assets' },
    { value: 'liabilities', label: 'Liabilities' },
    { value: 'equity', label: 'Equity' },
    { value: 'revenue', label: 'Revenue' },
    { value: 'expenses', label: 'Expenses' },
]
export function LedgerAccountDialog({ open, onOpenChange }: any) {
    const [activeTab, setActiveTab] = useState("settings");
    const [formData, setFormData] = useState({
        accountId: 'L01250',
        referenceNo: '',
        accountHeadName: '',
        accountHeadArabic: '',
        accountGroup: '',
    })
    const [showAccountingLedgerFrom, setshowAccountingLedgerFrom] = useState(false);
    const [ledger, setLedger] = useState(false);
    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form Data:', formData)
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[90vw] h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Ledger Account Management</DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-2'>

                    <CustomInput
                        label="Account ID"
                        type="text"
                        value={formData.accountId}
                        onChange={(val) => handleChange('accountId', val)}
                        placeholder="Enter Account ID"
                    />
                    <CustomInput
                        label="Reference No"
                        type="text"
                        value={formData.referenceNo}
                        onChange={(val) => handleChange('referenceNo', val)}
                        placeholder="Enter Reference No"
                    />
                    <CustomInput
                        label="Account Head Name"
                        type="text"
                        value={formData.accountHeadName}
                        onChange={(val) => handleChange('accountHeadName', val)}
                        placeholder="Enter Account Head Name"
                    />
                    <CustomInput
                        label="Account Head in Arabic"
                        type="text"
                        value={formData.accountHeadArabic}
                        onChange={(val) => handleChange('accountHeadArabic', val)}
                        placeholder="Enter Account Head in Arabic"
                    />
                </div>
                <div className='flex w-full gap-1'>

                    <CustomInput
                        label="Account Group"
                        type="text"
                        value={formData.accountHeadArabic}
                        onChange={(val) => handleChange('accountHeadArabic', val)}
                        placeholder="Enter Account Head in Arabic"
                        className='flex-1'
                    />
                    <Button variant='outline' className='mt-6' onClick={() => setshowAccountingLedgerFrom(!showAccountingLedgerFrom)}>

                        <Plus />
                    </Button>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-8 w-full">
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="contact">Contact</TabsTrigger>
                        <TabsTrigger value="bank">Bank</TabsTrigger>
                        <TabsTrigger value="client">Client</TabsTrigger>
                        <TabsTrigger value="supplier">Supplier</TabsTrigger>
                        <TabsTrigger value="attachments">Attachments</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                        <TabsTrigger value="obsolete">Obsolete</TabsTrigger>
                    </TabsList>
                    <TabsContent value="settings">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">

                                <div>
                                    <Label htmlFor="openingBalance" className="text-sm font-medium">Opening Balance:</Label>
                                    <Input type="number" id="openingBalance" name="openingBalance" />
                                </div>
                                <div>
                                    <CustomInput
                                        label="Choose Credit/Debit"
                                        type="dropdown"
                                        value={formData.accountGroup}
                                        onChange={(val) => handleChange('accountGroup', val)}
                                        options={[{ value: 'cr', label: 'CR' }, { value: 'dr', label: 'DR' }]}
                                        valueToSearch="value"
                                    />
                                </div>

                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {/* Left Column - Checkbox Options */}
                                <div className='space-y-4'>
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center h-5 mt-1">
                                            <Checkbox id="defaultEntry" name="defaultEntry" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="defaultEntry" className="text-sm font-medium">
                                                Default for Entry
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Choose this if you want to Default Entry in Vouchers
                                            </p>
                                        </div>
                                    </div>

                                    {/* Repeat same structure for other checkboxes */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center h-5 mt-1">
                                            <Checkbox id="maintainBill" name="maintainBill" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="maintainBill" className="text-sm font-medium">
                                                Maintain Bill By Bill
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Choose if you want to maintain Billwise details
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center h-5 mt-1">
                                            <Checkbox id="maintainBill" name="maintainBill" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="maintainBill" className="text-sm font-medium">
                                                Link to Employee DB
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Choose if you want this account to link with Employee Database.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center h-5 mt-1">
                                            <Checkbox id="maintainBill" name="maintainBill" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="maintainBill" className="text-sm font-medium">
                                                Link to Property DB
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Choose if you want this account to link with Property Database.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center h-5 mt-1">
                                            <Checkbox id="maintainBill" name="maintainBill" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="maintainBill" className="text-sm font-medium">
                                               Employees Loan Account
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Choose if you want this account to link with Employee's salary Advance.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Add similar blocks for other checkboxes... */}
                                </div>

                                {/* Right Column - Inputs and Switch */}
                                <div className='space-y-6 mt-1'>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="voucherAbbr" className="text-sm font-medium">
                                                Voucher No Abbr
                                            </Label>
                                            <Input
                                                id="voucherAbbr"
                                                name="voucherAbbr"
                                                placeholder="Enter abbreviation"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="daysCredit" className="text-sm font-medium">
                                                No of Days Credits
                                            </Label>
                                            <Input
                                                id="daysCredit"
                                                name="daysCredit"
                                                type="number"
                                                placeholder="Enter number of days"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <Label htmlFor="ledgerActive" className="text-sm font-medium">
                                                Ledger Status
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                {ledger ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                        <Switch
                                            id="ledgerActive"
                                            checked={ledger}
                                            onCheckedChange={setLedger}
                                            className="data-[state=checked]:bg-green-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                       


                    </TabsContent>
                    <TabsContent value="contact">
                    </TabsContent>

                </Tabs>
                <Dialog open={showAccountingLedgerFrom} onOpenChange={setshowAccountingLedgerFrom}>
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <AccountingLedgerForm setshowAccountingLedgerFrom={setshowAccountingLedgerFrom} />
                    </DialogContent>
                </Dialog>
                <div className='flex justify-end gap-2'>
                    <Button variant='destructive' onClick={() => onOpenChange(false)}>Close</Button>
                    <Button variant='outline'>Save</Button>
                </div>  
            </DialogContent>
        </Dialog>
    );
}