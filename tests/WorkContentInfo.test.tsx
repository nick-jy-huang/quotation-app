import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkContentInfo from '@/components/QuotationForm/WorkContentInfo';
import React from 'react';

describe('WorkContentInfo', () => {
  it('renders textarea fields', () => {
    render(
      <WorkContentInfo
        mainWorkContent="內容A"
        techStack="React"
        onMainWorkContentChange={vi.fn()}
        onTechStackChange={vi.fn()}
      />,
    );
    expect(screen.getByLabelText('主要工作內容')).toBeInTheDocument();
    expect(screen.getByLabelText('技術要求')).toBeInTheDocument();
  });

  it('calls onMainWorkContentChange when textarea changes', async () => {
    const onMainWorkContentChange = vi.fn();
    render(
      <WorkContentInfo
        mainWorkContent="內容A"
        techStack="React"
        onMainWorkContentChange={onMainWorkContentChange}
        onTechStackChange={vi.fn()}
      />,
    );
    const mainTextarea = screen.getByLabelText('主要工作內容');
    await userEvent.clear(mainTextarea);
    await userEvent.type(mainTextarea, '內容B');
    await new Promise((r) => setTimeout(r, 350));
    expect(onMainWorkContentChange).toHaveBeenCalledWith('內容B');
  });

  it('calls onTechStackChange when textarea changes', async () => {
    const onTechStackChange = vi.fn();
    render(
      <WorkContentInfo
        mainWorkContent="內容A"
        techStack="React"
        onMainWorkContentChange={vi.fn()}
        onTechStackChange={onTechStackChange}
      />,
    );
    const techTextarea = screen.getByLabelText('技術要求');
    await userEvent.clear(techTextarea);
    await userEvent.type(techTextarea, 'Vue');
    await new Promise((r) => setTimeout(r, 350));
    expect(onTechStackChange).toHaveBeenCalledWith('Vue');
  });
});
