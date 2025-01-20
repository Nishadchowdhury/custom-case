'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { changeOrderStatus } from "./action";
import { useRouter } from "next/navigation";


interface pageProps {
   id: string;
   orderStatus: OrderStatus
}

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = { // This is TypeScript Map, a collection that stores key-value pairs, where keys can be of any type. It basically we use to turn data into usable formate. This time the keys are as OrderStatus types.
   awaiting_shipment: "Awaiting Shipment",
   fullfilled: "Fullfilled",
   shipped: "Shipped",
}

const StatusDropdown: React.FC<pageProps> = ({ id, orderStatus }) => {

   const router = useRouter()

   const { mutate } = useMutation({
      mutationKey: ["change-order-status"],
      mutationFn: changeOrderStatus,
      onSuccess: () => router.refresh()
   })

   return <DropdownMenu>
      <DropdownMenuTrigger>
         <Button
            variant='outline'
            className="w-52 flex justify-between items-center"
         >
            {LABEL_MAP[orderStatus]}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
         </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0" >
         {Object.keys(OrderStatus).map((status) => (
            <DropdownMenuItem key={status}
               className={cn('flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
                  {
                     'bg-zinc-100': orderStatus === status
                  }
               )}
               onClick={() => mutate({ id, newStatus: status as OrderStatus })} // whenever typescript ask for validation we need to cast the type.
            >
               <Check className={cn('mr-2 h-4 w-4 text-primary ', orderStatus === status ? "opacity-100" : 'opacity-0')} />
               {LABEL_MAP[status as OrderStatus]}
            </DropdownMenuItem>
         ))}
      </DropdownMenuContent>

   </DropdownMenu>
}

export default StatusDropdown;