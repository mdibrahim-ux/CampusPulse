import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  CircleCheck,
  FileCheck2,
  GraduationCap,
} from 'lucide-react';

export function HeroWorkspacePreview() {
  return (
    <div className="nb-preview-wrap">
      <div className="nb-preview-note">
        <span className="nb-preview-note-mark"><Check size={13} strokeWidth={3} /></span>
        A clearer view of what comes next
      </div>

      <div className="nb-workspace-preview" role="group" aria-label="Illustrative CampusPulse student workspace preview">
        <div className="nb-preview-windowbar">
          <div className="nb-window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span className="nb-preview-window-title">CAMPUSPULSE / MY WORKSPACE</span>
          <span className="nb-preview-live">SAMPLE VIEW</span>
        </div>

        <div className="nb-preview-body">
          <div className="nb-preview-greeting">
            <div>
              <span className="nb-mono-label">YOUR STUDENT OVERVIEW</span>
              <h2>Keep moving<br /><em>with a plan.</em></h2>
            </div>
            <span className="nb-preview-date">THIS WEEK <CalendarDays size={14} /></span>
          </div>

          <div className="nb-preview-stat-grid">
            <div className="nb-preview-stat nb-preview-stat-yellow">
              <span className="nb-preview-stat-icon"><GraduationCap size={17} /></span>
              <small>SAVED SCHEMES</small>
              <strong>04</strong>
              <span>Options to review</span>
            </div>
            <div className="nb-preview-stat nb-preview-stat-blue">
              <span className="nb-preview-stat-icon"><FileCheck2 size={17} /></span>
              <small>DOCUMENTS</small>
              <strong>02</strong>
              <span>Ready to prepare</span>
            </div>
            <div className="nb-preview-stat nb-preview-stat-orange">
              <span className="nb-preview-stat-icon"><Bookmark size={17} /></span>
              <small>NEXT STEPS</small>
              <strong>03</strong>
              <span>In your planner</span>
            </div>
          </div>

          <div className="nb-preview-lower">
            <div className="nb-preview-tasks">
              <div className="nb-preview-subhead">
                <strong>YOUR NEXT STEPS</strong>
                <span>EXAMPLE</span>
              </div>
              <div className="nb-preview-task">
                <span className="nb-task-check"><Check size={12} /></span>
                <span><b>Review scheme conditions</b><small>Scholarship shortlist</small></span>
                <CircleCheck size={16} className="nb-task-done" />
              </div>
              <div className="nb-preview-task">
                <span className="nb-task-empty" />
                <span><b>Prepare income certificate</b><small>Document checklist</small></span>
                <span className="nb-task-status">NEXT</span>
              </div>
            </div>
            <div className="nb-preview-progress">
              <span className="nb-mono-label">YOUR CHECKLIST</span>
              <strong>2 of 3</strong>
              <div className="nb-progress-track"><i /></div>
              <small>Small steps add up.</small>
              <ArrowUpRight size={17} />
            </div>
          </div>
        </div>
      </div>

      <div className="nb-preview-caption">
        <span><i /> BUILT AROUND YOUR NEXT STEP</span>
        <span>NOT ANOTHER PORTAL TO FIGURE OUT</span>
      </div>
    </div>
  );
}
