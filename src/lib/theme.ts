export const categoryTheme: Record<
  string,
  {
    rail: string;
    mark: string;
    hoverBorder: string;
    dot: string;
  }
> = {
  platform: {
    rail: 'bg-cat-platform',
    mark: 'bg-cat-platform/12 text-cat-platform',
    hoverBorder: 'group-hover:border-cat-platform/45',
    dot: 'bg-cat-platform',
  },
  cicd: {
    rail: 'bg-cat-cicd',
    mark: 'bg-cat-cicd/12 text-cat-cicd',
    hoverBorder: 'group-hover:border-cat-cicd/45',
    dot: 'bg-cat-cicd',
  },
  office: {
    rail: 'bg-cat-office',
    mark: 'bg-cat-office/12 text-cat-office',
    hoverBorder: 'group-hover:border-cat-office/45',
    dot: 'bg-cat-office',
  },
  other: {
    rail: 'bg-cat-other',
    mark: 'bg-cat-other/12 text-cat-other',
    hoverBorder: 'group-hover:border-cat-other/45',
    dot: 'bg-cat-other',
  },
};

export function getCategoryTheme(id: string) {
  return categoryTheme[id] ?? categoryTheme.other;
}
