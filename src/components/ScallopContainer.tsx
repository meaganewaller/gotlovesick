import * as React from 'react';

export function ScallopContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="scallop-box">
      <div className="box-top">
        <div className="u01" />
      </div>
      <div className="box-center">
        <div className="box-inner">{children}</div>
      </div>
      <div className="box-bottom">
        <div className="s01" />
      </div>
    </div>
  );
}
