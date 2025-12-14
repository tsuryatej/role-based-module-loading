import { Component } from '@angular/core';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  pageTitle = 'Frequently Asked Questions';
  pageSubtitle =
    'Quick answers to common questions about role-based modules, routing, and the overall project structure.';

  categories: string[] = [
    'All',
    'General',
    'Routing & Modules',
    'Roles & Security',
    'UI & Styling',
  ];

  selectedCategory = 'All';

  faqs: FaqItem[] = [
    {
      id: 1,
      question: 'What is role-based module loading?',
      answer:
        'Role-based module loading means only the modules that are relevant to the current user role are loaded and exposed in navigation, keeping the app lean, secure, and easier to reason about.',
      category: 'General',
    },
    {
      id: 2,
      question: 'Can I add more roles later?',
      answer:
        'Yes. You can introduce additional roles by extending your role model, updating guards, and mapping new routes and modules for those roles. The current structure is intentionally flexible for that.',
      category: 'Roles & Security',
    },
    {
      id: 3,
      question: 'How are routes organized in this project?',
      answer:
        'Routes are grouped by areas such as Home, About, Contact, Auth, and potential feature modules. This allows you to lazily load feature areas and keep the root configuration clean.',
      category: 'Routing & Modules',
    },
    {
      id: 4,
      question: 'Do I need a backend to use this layout?',
      answer:
        'No. You can start with mock data and later wire real APIs. The layout and routing are separated from data sources, so backend integration can happen incrementally.',
      category: 'General',
    },
    {
      id: 5,
      question: 'Is Bootstrap required or can I switch to another UI library?',
      answer:
        'Bootstrap is used for the base layout in this starter, but you can gradually replace components with Angular Material, Tailwind-based UI, or your design system without changing the application structure.',
      category: 'UI & Styling',
    },
    {
      id: 6,
      question: 'How do guards fit into role-based routing?',
      answer:
        'Route guards can check the authenticated user’s role and decide whether to allow navigation, redirect to login, or show an access-denied page for restricted modules.',
      category: 'Roles & Security',
    },
    {
      id: 7,
      question: 'Can I lazy load feature modules per role?',
      answer:
        'Yes. Each feature module can be configured as a lazy route and only included in the routing tree when the corresponding role or feature is enabled.',
      category: 'Routing & Modules',
    },
  ];

  get filteredFaqs(): FaqItem[] {
    if (this.selectedCategory === 'All') {
      return this.faqs;
    }
    return this.faqs.filter((faq) => faq.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}
