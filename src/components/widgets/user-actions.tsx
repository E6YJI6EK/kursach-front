import React, { FC } from 'react';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';

interface UserActionsProps {
  className?: string;
}

export const UserActions: FC<UserActionsProps> = (props) => {
  const { className } = props;

  return (
    <div className={cn('flex justify-between', className)}>
      <Button></Button>
    </div>
  );
};