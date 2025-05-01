"use client"

import { useState } from "react"
import type { ApplicationData } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface SkillsTableProps {
  data: ApplicationData[]
}

export default function SkillsTable({ data }: SkillsTableProps) {
  const [selectedPosition, setSelectedPosition] = useState<string>("all")

  // Get all unique positions
  const positions = Array.from(new Set(data.map((app) => app.positionAppliedFor)))

  // Filter data based on selected position
  const filteredData =
    selectedPosition === "all" ? data : data.filter((app) => app.positionAppliedFor === selectedPosition)

  // Get skills frequency for the filtered data
  const skillsFrequency: Record<string, number> = {}
  filteredData.forEach((app) => {
    app.skills.forEach((skill) => {
      skillsFrequency[skill] = (skillsFrequency[skill] || 0) + 1
    })
  })

  // Sort skills by frequency
  const sortedSkills = Object.entries(skillsFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([skill, count]) => ({ skill, count }))

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
              <TableHead>Skill</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSkills.length > 0 ? (
              sortedSkills.map(({ skill, count }) => (
                <TableRow key={skill}>
                  <TableCell className="font-medium">{skill}</TableCell>
                  <TableCell>{count} applicants</TableCell>
                  <TableCell>{Math.round((count / filteredData.length) * 100)}%</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No skills data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium mb-2">Common Skills by Position</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {positions.map((position) => {
            // Get applicants for this position
            const positionApplicants = data.filter((app) => app.positionAppliedFor === position)

            // Get skills frequency for this position
            const posSkillsFreq: Record<string, number> = {}
            positionApplicants.forEach((app) => {
              app.skills.forEach((skill) => {
                posSkillsFreq[skill] = (posSkillsFreq[skill] || 0) + 1
              })
            })

            // Get top 5 skills
            const topSkills = Object.entries(posSkillsFreq)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([skill, count]) => ({ skill, count }))

            return (
              <div key={position} className="border rounded-md p-4">
                <h4 className="font-medium mb-2">{position}</h4>
                <div className="flex flex-wrap gap-2">
                  {topSkills.map(({ skill, count }) => (
                    <Badge key={skill} variant="secondary">
                      {skill} ({count})
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
