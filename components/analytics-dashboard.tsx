"use client";

import { useState, useEffect } from "react";
import { Download, Users, MapPin, Briefcase, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { generateApplicationData } from "@/lib/data-generator";
import type { ApplicationData } from "@/lib/types";
import LocationsChart from "@/components/charts/locations-chart";
import OccupationsChart from "@/components/charts/occupations-chart";
import ExperienceChart from "@/components/charts/experience-chart";
import PositionsChart from "@/components/charts/positions-chart";
import WorkArrangementChart from "@/components/charts/work-arrangement-chart";
import ApplicationsTable from "@/components/tables/applications-table";
import CVsList from "@/components/lists/cvs-list";
import NamesChart from "./charts/names-charts";
import SkillsTable from "./tables/skill-table";

export default function AnalyticsDashboard() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [africanApplicantsCount, setAfricanApplicantsCount] = useState(0);

  useEffect(() => {
    // Generate application data
    const data = generateApplicationData(100); // Generate 100 applications
    setApplications(data);

    const AFRICAN_COUNTRIES = ["Nigeria", "South Africa", "Ghana", "Kenya"];
    const count = data.filter((app) =>
      AFRICAN_COUNTRIES.some((country) => app.location.includes(country))
    ).length;
    setAfricanApplicantsCount(count);

    setIsLoading(false);
  }, []);

  const exportToCSV = () => {
    // Convert applications data to CSV format
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Location",
      "Current Occupation",
      "Position Applied For",
      "Years of Experience",
      "Skills",
      "Work Arrangement",
      "Application Date",
    ];

    const csvRows = [
      headers.join(","),
      ...applications.map((app) =>
        [
          `"${app.name}"`,
          `"${app.email}"`,
          `"${app.phone}"`,
          `"${app.location}"`,
          `"${app.currentOccupation}"`,
          `"${app.positionAppliedFor}"`,
          app.yearsOfExperience,
          `"${app.skills.join("; ")}"`,
          `"${app.workArrangement}"`,
          `"${app.applicationDate}"`,
        ].join(",")
      ),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "job_applications_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading analytics data...</h2>
          <p className="text-muted-foreground">
            Please wait while we prepare your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Job Applications Analytics
          </h1>
          <p className="text-muted-foreground">
            Construction &amp; Real Estate Agency - Wolverhampton, UK
          </p>
        </div>
        <Button onClick={exportToCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export as CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              From February 2025 and earlier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Plumber, Carpenter, Bricklayer, Construction Expert
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Experience
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                applications.reduce(
                  (sum, app) => sum + app.yearsOfExperience,
                  0
                ) / applications.length
              ).toFixed(1)}{" "}
              years
            </div>
            <p className="text-xs text-muted-foreground">
              Across all applicants
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              African Applicants
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{africanApplicantsCount}</div>
            <p className="text-xs text-muted-foreground">
              {((africanApplicantsCount / applications.length) * 100).toFixed(
                1
              )}
              % of total
            </p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nigerian Applicants</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter((app) => app.location.includes("Nigeria")).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (applications.filter((app) => app.location.includes("Nigeria")).length / applications.length) *
                100
              ).toFixed(1)}
              % of total
            </p>
          </CardContent>
        </Card> */}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="skills">Skills &amp; Experience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Applications Over Time</CardTitle>
                <CardDescription>Monthly application trends</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <NamesChart data={applications} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Years of Experience</CardTitle>
                <CardDescription>
                  Distribution by experience level
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ExperienceChart data={applications} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Work Arrangements</CardTitle>
                <CardDescription>Preferred employment types</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <WorkArrangementChart data={applications} />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Positions Applied For</CardTitle>
                <CardDescription>Distribution by job role</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PositionsChart data={applications} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applicants" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Applicant Locations</CardTitle>
                <CardDescription>Geographic distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LocationsChart data={applications} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Current Occupations</CardTitle>
                <CardDescription>
                  Applicants&apos; current roles
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <OccupationsChart data={applications} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>All Applicants</CardTitle>
              <CardDescription>Complete list of job applicants</CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationsTable data={applications} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Interest by Position</CardTitle>
                <CardDescription>
                  Number of applications per position
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PositionsChart data={applications} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Position by Experience</CardTitle>
                <CardDescription>
                  Average years of experience per position
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full flex items-center justify-center">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Position</th>
                        <th className="text-right py-2">Avg. Experience</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Plumber",
                        "Carpenter",
                        "Bricklayer",
                        "Construction Expert",
                      ].map((position) => {
                        const positionApps = applications.filter(
                          (app) => app.positionAppliedFor === position
                        );
                        const avgExp =
                          positionApps.length > 0
                            ? (
                                positionApps.reduce(
                                  (sum, app) => sum + app.yearsOfExperience,
                                  0
                                ) / positionApps.length
                              ).toFixed(1)
                            : "N/A";
                        return (
                          <tr key={position} className="border-b">
                            <td className="py-2">{position}</td>
                            <td className="text-right py-2">{avgExp} years</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Position by Work Arrangement</CardTitle>
                <CardDescription>
                  Preferred work arrangements by position
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full flex items-center justify-center">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Position</th>
                        <th className="text-right py-2">Full-time</th>
                        <th className="text-right py-2">Part-time</th>
                        <th className="text-right py-2">Contract</th>
                        <th className="text-right py-2">Freelance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Plumber",
                        "Carpenter",
                        "Bricklayer",
                        "Construction Expert",
                      ].map((position) => {
                        const positionApps = applications.filter(
                          (app) => app.positionAppliedFor === position
                        );
                        const fullTime = positionApps.filter(
                          (app) => app.workArrangement === "Full-time"
                        ).length;
                        const partTime = positionApps.filter(
                          (app) => app.workArrangement === "Part-time"
                        ).length;
                        const contract = positionApps.filter(
                          (app) => app.workArrangement === "Contract"
                        ).length;
                        const freelance = positionApps.filter(
                          (app) => app.workArrangement === "Freelance"
                        ).length;

                        return (
                          <tr key={position} className="border-b">
                            <td className="py-2">{position}</td>
                            <td className="text-right py-2">{fullTime}</td>
                            <td className="text-right py-2">{partTime}</td>
                            <td className="text-right py-2">{contract}</td>
                            <td className="text-right py-2">{freelance}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Years of Experience</CardTitle>
                <CardDescription>
                  Distribution across experience ranges
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ExperienceChart data={applications} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Skills by Position</CardTitle>
              <CardDescription>Common skills for each position</CardDescription>
            </CardHeader>
            <CardContent>
              <SkillsTable data={applications} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>CV Documents</CardTitle>
              <CardDescription>Uploaded resumes and CVs</CardDescription>
            </CardHeader>
            <CardContent>
              <CVsList data={applications} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
