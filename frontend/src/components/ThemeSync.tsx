"use client";

import { useEffect } from "react";

export default function ThemeSync({ theme }: { theme?: string }) {
    useEffect(() => {
        console.log('🎨 ThemeSync applied:', theme);
        if (theme) {
            document.body.setAttribute("data-theme", theme.toLowerCase());
        } else {
            document.body.removeAttribute("data-theme");
        }

        return () => {
            document.body.removeAttribute("data-theme");
        };
    }, [theme]);

    return null;
}
