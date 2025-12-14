import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ArchitectureBlock {
  title: string;
  description: string;
}

interface RoleDefinition {
  name: string;
  summary: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {
  pageTitle = 'About This Application';
  pageSubtitle =
    'An Angular-based application designed with role-based module loading, clean separation of concerns, and a scalable architecture.';

  architectureBlocks: ArchitectureBlock[] = [
    {
      title: 'Core',
      description:
        'Contains global services, layout components (navbar, footer), and base configuration shared across the entire app.'
    },
    {
      title: 'Feature Modules',
      description:
        'Dedicated feature areas (e.g., Home, Auth, Admin, Dashboard) that can be loaded eagerly or lazily based on routing.'
    },
    {
      title: 'Shared',
      description:
        'Reusable UI components, pipes, and directives used by multiple features, keeping duplication low and consistency high.'
    },
    {
      title: 'Auth & Guards',
      description:
        'Role-based access control implemented via Angular route guards and navigation rules to protect sensitive routes.'
    }
  ];

  roles: RoleDefinition[] = [
    {
      name: 'Guest',
      summary:
        'Can browse public pages such as Home, About, and Contact; can register or log in to get additional access.'
    },
    {
      name: 'User',
      summary:
        'Gets access to user-specific modules, profiles, and dashboards once authenticated, with restricted admin actions.'
    },
    {
      name: 'Admin',
      summary:
        'Can manage configuration, users, and certain feature modules; intended to view and control application-wide settings.'
    }
  ];

  techStack: string[] = [
    'Angular (standalone components)',
    'TypeScript',
    'Bootstrap 5',
    'Role-based routing and guards',
    'REST API-ready architecture'
  ];
}
