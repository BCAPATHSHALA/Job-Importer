import { JobDetails } from "@/components/job-details";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function JobPage(context: {
  params: Promise<{ id: string }>;
}) {
  const params = await context.params;
  const id = params.id;

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

      <JobDetails jobId={id} />
    </div>
  );
}
