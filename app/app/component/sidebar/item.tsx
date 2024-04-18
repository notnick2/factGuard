"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";


interface ISidebarItem {
  name: string;
  path: string;
 // icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const SidebarItem = ({ item }: { item: ISidebarItem }) => {
  const { name,/* icon: Icon,*/ items, path } = item;
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (items && items.length > 0) {
      return setExpanded(!expanded);
    }

    return router.push(path);
  };
  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      if (items.find((item) => item.path === pathname)) {
        setExpanded(true);
        return true;
      }
    }

    return path === pathname;
  }, [items, path, pathname]);

  return (
    <>
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-[#8DECB4] cursor-pointer hover:text-[#000000] justify-between
     ${isActive && "text-[#000000] bg-[#8DECB4]"}
    `}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
         {/* <Icon size={20} /> */}
          <p className="text-sm font-semibold">{name} </p>
        </div>
      </div>    
   </>
  );
};

export default SidebarItem;
