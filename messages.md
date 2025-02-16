update message:-
🔧 We’re Upgrading Our Website! 🔧
un a quote italic css:- "Our website is currently undergoing an upgrade to bring you a better experience. Please check back later. Thank you for your patience!"

className={({ active, checked }) => cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent ',
{
[`border-${color.tw}`]: active || checked // cn function doesn't support template string directly in conditions so [``] needed here.
}
)
}
