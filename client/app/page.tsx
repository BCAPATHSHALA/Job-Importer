import { JobsTable } from "@/components/jobs-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Job Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and view all imported jobs from various sources
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
          <CardDescription>
            Browse through all imported job listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobsTable />
        </CardContent>
      </Card>
    </div>
  );
}
