import { LogsTable } from "@/components/logs-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LogsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Import History</h1>
        <p className="text-muted-foreground">
          Track job import statistics and history
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import Logs</CardTitle>
          <CardDescription>
            View detailed import statistics for each job fetch operation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogsTable />
        </CardContent>
      </Card>
    </div>
  );
}
