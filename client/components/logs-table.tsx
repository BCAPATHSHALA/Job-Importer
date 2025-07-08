"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Download,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface ImportLog {
  _id: string;
  timestamp: string;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: number;
  errorMessages: string[];
  __v: number;
}

export function LogsTable() {
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/logs");
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getStatusBadge = (log: ImportLog) => {
    if (log.failedJobs > 0) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Partial Success
        </Badge>
      );
    }
    if (log.totalImported > 0) {
      return (
        <Badge
          variant="default"
          className="flex items-center gap-1 bg-green-600"
        >
          <CheckCircle className="h-3 w-3" />
          Success
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        No Data
      </Badge>
    );
  };

  const calculateStats = () => {
    const totalRuns = logs.length;
    const successfulRuns = logs.filter(
      (log) => log.failedJobs === 0 && log.totalImported > 0
    ).length;
    const totalJobsImported = logs.reduce(
      (sum, log) => sum + log.totalImported,
      0
    );
    const totalNewJobs = logs.reduce((sum, log) => sum + log.newJobs, 0);
    const totalUpdatedJobs = logs.reduce(
      (sum, log) => sum + log.updatedJobs,
      0
    );
    const totalFailedJobs = logs.reduce((sum, log) => sum + log.failedJobs, 0);

    return {
      totalRuns,
      successfulRuns,
      totalJobsImported,
      totalNewJobs,
      totalUpdatedJobs,
      totalFailedJobs,
    };
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading logs: {error}
          <Button
            variant="outline"
            size="sm"
            className="ml-4 bg-transparent"
            onClick={fetchLogs}
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {logs.length} import runs
        </div>
        <Button onClick={fetchLogs} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              Total Runs
            </div>
            <div className="text-2xl font-bold">{stats.totalRuns}</div>
            <div className="text-xs text-muted-foreground">
              {stats.successfulRuns} successful
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Download className="h-4 w-4" />
              Total Imported
            </div>
            <div className="text-2xl font-bold">{stats.totalJobsImported}</div>
            <div className="text-xs text-muted-foreground">Jobs processed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Plus className="h-4 w-4" />
              New Jobs
            </div>
            <div className="text-2xl font-bold text-green-600">
              {stats.totalNewJobs}
            </div>
            <div className="text-xs text-muted-foreground">
              {stats.totalUpdatedJobs} updated
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <XCircle className="h-4 w-4" />
              Failed Jobs
            </div>
            <div className="text-2xl font-bold text-red-600">
              {stats.totalFailedJobs}
            </div>
            <div className="text-xs text-muted-foreground">Across all runs</div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Import History Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Fetched</TableHead>
                  <TableHead className="text-right">Imported</TableHead>
                  <TableHead className="text-right">New</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                  <TableHead className="text-right">Failed</TableHead>
                  <TableHead>Errors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell className="font-mono text-sm">
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell>{getStatusBadge(log)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {log.totalFetched}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {log.totalImported}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {log.newJobs}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {log.updatedJobs}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {log.failedJobs > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          {log.failedJobs}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {log.errorMessages.length > 0 ? (
                        <Badge variant="destructive" className="text-xs">
                          {log.errorMessages.length} error(s)
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          None
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {logs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No import logs available.</p>
        </div>
      )}
    </div>
  );
}
