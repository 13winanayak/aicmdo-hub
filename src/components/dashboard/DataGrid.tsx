import { useState } from 'react';
import { MoreHorizontal, ArrowUpDown, Eye, UserCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Lead {
  id: string;
  company: string;
  contactName: string;
  generatedTime: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Nurturing' | 'Closed';
  assignedTo: string;
  score: number;
}

// Mock data
const leads: Lead[] = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    contactName: 'John Smith',
    generatedTime: '2024-01-15 10:30',
    source: 'Website',
    status: 'New',
    assignedTo: 'Jane Doe',
    score: 8.5,
  },
  {
    id: '2',
    company: 'StartupXYZ',
    contactName: 'Sarah Wilson',
    generatedTime: '2024-01-15 09:15',
    source: 'LinkedIn',
    status: 'Contacted',
    assignedTo: 'Mike Johnson',
    score: 9.2,
  },
  {
    id: '3',
    company: 'Enterprise Solutions',
    contactName: 'Robert Brown',
    generatedTime: '2024-01-15 08:45',
    source: 'Email',
    status: 'Qualified',
    assignedTo: 'Sarah Davis',
    score: 7.8,
  },
  {
    id: '4',
    company: 'Global Industries',
    contactName: 'Emily Chen',
    generatedTime: '2024-01-15 11:20',
    source: 'Cold Outreach',
    status: 'Nurturing',
    assignedTo: 'John Doe',
    score: 6.9,
  },
  {
    id: '5',
    company: 'Innovation Labs',
    contactName: 'David Martinez',
    generatedTime: '2024-01-15 12:10',
    source: 'Referral',
    status: 'New',
    assignedTo: 'Jane Doe',
    score: 8.1,
  },
];

const getStatusColor = (status: Lead['status']) => {
  switch (status) {
    case 'New':
      return 'bg-command-info/10 text-command-info border-command-info/20';
    case 'Contacted':
      return 'bg-command-primary/10 text-command-primary border-command-primary/20';
    case 'Qualified':
      return 'bg-command-success/10 text-command-success border-command-success/20';
    case 'Nurturing':
      return 'bg-command-warning/10 text-command-warning border-command-warning/20';
    case 'Closed':
      return 'bg-command-secondary/10 text-command-secondary border-command-secondary/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-command-success';
  if (score >= 6) return 'text-command-warning';
  return 'text-command-danger';
};

export function DataGrid() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Lead | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key: keyof Lead) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <span>Recent Lead Queue</span>
          <Badge variant="secondary" className="text-xs">
            {leads.length} leads
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 -ml-2"
                    onClick={() => handleSort('company')}
                  >
                    Company
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 -ml-2"
                    onClick={() => handleSort('contactName')}
                  >
                    Contact Name
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 -ml-2"
                    onClick={() => handleSort('generatedTime')}
                  >
                    Generated Time
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{lead.company}</TableCell>
                  <TableCell>{lead.contactName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.generatedTime}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{lead.assignedTo}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Reassign
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Change Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}