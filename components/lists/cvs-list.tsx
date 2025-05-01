"use client"

import { useState } from "react"
import type { ApplicationData } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

interface CVsListProps {
  data: ApplicationData[]
}

export default function CVsList({ data }: CVsListProps) {
  const [selectedPosition, setSelectedPosition] = useState<string>("all")

  // Get all unique positions
  const positions = Array.from(new Set(data.map((app) => app.positionAppliedFor)))

  // Filter data based on selected position
  const filteredData =
    selectedPosition === "all" ? data : data.filter((app) => app.positionAppliedFor === selectedPosition)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-[250px]">
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>CV Filename</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.positionAppliedFor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {app.cvFileName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No CV documents available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Note: CV documents are available for download. The system has {filteredData.length} CVs on file.</p>
      </div>
    </div>
  )
}