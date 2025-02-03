import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

interface Voucher {
    VoucherNo: string;
    DrAmount: number;
    CrAmount: number;
    // Add other properties as needed
}

interface Props {
    data: Voucher[];
}

const AccountingBoxes = ({ data }: Props) => {
    const [debitTotal, setDebitTotal] = useState(0);
    const [creditTotal, setCreditTotal] = useState(0);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Calculate totals whenever data changes
        const newDebit = data.reduce((sum, entry) => sum + entry.DrAmount, 0);
        const newCredit = data.reduce((sum, entry) => sum + entry.CrAmount, 0);

        setDebitTotal(newDebit);
        setCreditTotal(newCredit);
        setAnimate(true);

        // Reset animation flag after 1 second
        const timer = setTimeout(() => setAnimate(false), 1000);
        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div className="flex  gap-3 ">
            {/* Debit Box */}
            <div className="bg-white p-2 rounded-lg border relative">
                <span className='h-6 w-1 rounded-3xl  bg-red-500 absolute -left-[3px]' />
                <h3 className="text-red-600 font-semibold ">Total Debit (DR)</h3>
                <div className="font-medium">
                    {animate ? (
                        <CountUp
                            start={0}
                            end={debitTotal}
                            duration={1.5}
                            decimals={2}
                            separator=","
                            prefix="AED "
                        />
                    ) : (
                        `USD ${debitTotal.toFixed(2)}`
                    )}
                </div>
            </div>

            {/* Credit Box */}
            <div className="bg-white p-2  border rounded-lg relative ">
                <span className='h-6 w-1 rounded-3xl  bg-green-500 absolute -left-[3px]' />

                <h3 className="text-green-600 font-semibold ">Total Credit (CR)</h3>
                <div className="font-medium">
                    {animate ? (
                        <CountUp
                            start={0}
                            end={creditTotal}
                            duration={1.5}
                            decimals={2}
                            separator=","
                            prefix="AED "
                        />
                    ) : (
                        `USD ${creditTotal.toFixed(2)}`
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountingBoxes;