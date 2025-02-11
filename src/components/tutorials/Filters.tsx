'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TutorialType, SkillLevel, Nullable } from '@/types';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

interface TutorialFilterProps {
  tutorialTypes: TutorialType[];
  skillLevels: SkillLevel[];
  currentFilters: {
    tutorialType: Nullable<string>;
    skillLevel: Nullable<string>;
  };
}

export function TutorialFilters({
  tutorialTypes,
  skillLevels,
  currentFilters,
}: TutorialFilterProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (
    filterType: 'skillLevel' | 'tutorialType',
    name: string | null,
    checked: boolean
  ) => {
    const updatedFilters = { ...currentFilters };

    if (name) {
      if (checked) {
        updatedFilters[filterType] = name;
      } else {
        updatedFilters[filterType] = null;
      }
    } else {
      if (checked) {
        updatedFilters[filterType] = null;
      }
    }

    // Update URL query parameters to reflect the filters
    const queryParams = new URLSearchParams(window.location.search);
    if (updatedFilters[filterType] == null) {
      queryParams.delete(filterType);
    } else {
      queryParams.set(filterType, updatedFilters[filterType]);
    }

    // Push the updated URL state (without reloading the page)
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <aside className="filters">
      <div className="title">
        <h2>Filters</h2>
        {isMobile && (
          <span id="openFilters">
            {isOpen ? (
              <HiChevronUp onClick={() => setIsOpen(false)} />
            ) : (
              <HiChevronDown onClick={() => setIsOpen(true)} />
            )}
          </span>
        )}
      </div>
      <div className={`filter-body ${isMobile && isOpen ? 'open' : ''}`}>
        {tutorialTypes.length > 0 && (
          <div className="subjects">
            <h3>Subject</h3>
            {tutorialTypes.map((tutType) => (
              <div key={tutType.id}>
                <input
                  name={tutType.slug}
                  type="radio"
                  checked={currentFilters.tutorialType === tutType.slug}
                  onChange={(e) =>
                    handleFilterChange(
                      'tutorialType',
                      tutType.slug,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor={tutType.slug}>{tutType.name}</label>
              </div>
            ))}
            <input
              name="clearTutorials"
              type="radio"
              checked={currentFilters.tutorialType === null}
              onChange={(e) =>
                handleFilterChange('tutorialType', null, e.target.checked)
              }
            />
            <label htmlFor="clearTutorials">All</label>
          </div>
        )}

        {skillLevels.length > 0 && (
          <div className="skills">
            <h3>Skill Level</h3>
            {skillLevels.map((skillLevel) => (
              <div key={skillLevel.id}>
                <input
                  name={skillLevel.slug}
                  type="radio"
                  checked={currentFilters.skillLevel === skillLevel.slug}
                  onChange={(e) =>
                    handleFilterChange(
                      'skillLevel',
                      skillLevel.slug,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor={skillLevel.slug}>{skillLevel.name}</label>
              </div>
            ))}
            <input
              name="clearSkills"
              type="radio"
              checked={currentFilters.skillLevel === null}
              onChange={(e) =>
                handleFilterChange('skillLevel', null, e.target.checked)
              }
            />
            <label htmlFor="clearSkills">All</label>
          </div>
        )}
      </div>
    </aside>
  );
}
