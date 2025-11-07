'use client';
// app/page.tsx
import * as React from "react";
import {tokens,  Title1, makeStyles } from "@fluentui/react-components";
import { DashboardCharts } from "@/componets/ChartComponents";


const useStyles = makeStyles({
    mainLayout: {
        padding: "40px 20px",
        minHeight: "100vh",
        // Use a light neutral background for a SharePoint-like page canvas
        backgroundColor: tokens.colorNeutralBackground2, 
    },
    header: {
        marginBottom: "30px",
    },
});

export default function HomePage() {
    const styles = useStyles();

    return (
        // FluentProvider applies the modern Microsoft theme (Fluent UI v9)
       
            <div className={styles.mainLayout}>
                <Title1 className={styles.header}>FVAS & Solution Team Operations Dashboard</Title1>
                
                {/* ⭐️ Renders the three charts in a professional, responsive grid ⭐️ */}
                <DashboardCharts />

            </div>
     
    );
}