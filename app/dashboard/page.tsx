import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { db } from "../db";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatePrice } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusDropdown from "./StatusDropdown";

interface pageProps {

}
const page: React.FC<pageProps> = async () => {

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMAIL;
    if (!user || !isAdmin) return notFound()

    const orders = await db.order.findMany({
        where: {
            isPaid: true,
            createdAt: { // sorting on the fly
                // gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // last 24 hours
                gte: new Date(new Date().setDate(new Date().getDate() - 7)) // last 7 days
            },
        },
        orderBy: { // ordering on the fly
            createdAt: 'desc', // new ones on top.
        },
        include: { // joining 2 more tables
            user: true,
            ShippingAddress: true
        }
    })

    // last week retinue
    const lastWeekSum = await db.order.aggregate({ // using of aggregate functions to combine a set of values into a single value.
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
        },
        _sum: {
            amount: true
        }
    })

    // last week retinue
    const lastMonthSum = await db.order.aggregate({ // using of aggregate functions to combine a set of values into a single value.
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        },
        _sum: {
            amount: true
        }
    })

    const calculatedLastWeekRevenue = lastWeekSum._sum.amount ?? 0
    const calculatedLastMonthRevenue = lastMonthSum._sum.amount ?? 0
    const WEEKLY_GOAL = 500;
    const MONTHLY_GOAL = 2500;



    return (
        <div className='flex min-h-screen w-full bg-muted/40 ' >
            <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
                <div className="flex flex-col gap-16">
                    <div className="grid gap-4 sm:grid-cols-2 ">
                        <Card>
                            <CardHeader className="pb-2 ">
                                <CardDescription>Last week</CardDescription>
                                <CardTitle className="text-4xl">
                                    {formatePrice(calculatedLastWeekRevenue)}
                                </CardTitle>
                            </CardHeader>

                            <CardContent  >
                                <div className="text-sm text-muted-foreground ">
                                    of {formatePrice(WEEKLY_GOAL)} goal
                                </div>
                            </CardContent>

                            <CardFooter >
                                <div className="flex flex-col w-full" >
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Target is {(calculatedLastWeekRevenue * 100) / WEEKLY_GOAL}% completed.
                                    </p>
                                    <Progress value={((calculatedLastWeekRevenue * 100) / WEEKLY_GOAL)} />
                                </div>
                            </CardFooter>

                        </Card>

                        <Card>
                            <CardHeader className="pb-2 ">
                                <CardDescription>Last month</CardDescription>
                                <CardTitle className="text-4xl">
                                    {formatePrice(calculatedLastWeekRevenue)}
                                </CardTitle>
                            </CardHeader>

                            <CardContent  >
                                <div className="text-sm text-muted-foreground ">
                                    of {formatePrice(MONTHLY_GOAL)} goal
                                </div>
                            </CardContent>

                            <CardFooter >
                                <div className="flex flex-col w-full" >
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Target is {(calculatedLastMonthRevenue * 100) / MONTHLY_GOAL}% completed.
                                    </p>
                                    <Progress value={((calculatedLastMonthRevenue * 100) / MONTHLY_GOAL)} />
                                </div>
                            </CardFooter>

                        </Card>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Incoming orders
                    </h1>

                    <Table>

                        {/* T head */}
                        <TableHeader>
                            <TableRow>
                                <TableHead >Customer </TableHead>
                                <TableHead className="hidden sm:table-cell " >Status </TableHead>
                                <TableHead className="hidden sm:table-cell " >Purchase Date </TableHead>
                                <TableHead className="text-right " >Amount </TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* t Body */}
                        <TableBody>
                            {orders?.map((order) => (
                                <TableRow key={order.id} className="bg-accent " >

                                    <TableCell>
                                        <div className="font-medium ">{order.ShippingAddress?.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline ">
                                            {order.user.email}
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden sm:table-cell" >
                                        <StatusDropdown
                                            id={order.id}
                                            orderStatus={order.status}
                                        />
                                    </TableCell>

                                    <TableCell className="hidden sm:table-cell">
                                        {order.createdAt.toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="text-right" >
                                        {formatePrice(order.amount)}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    )

}

export default page;