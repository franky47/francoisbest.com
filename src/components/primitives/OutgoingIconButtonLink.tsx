import React from 'react'
import { OutgoingLink, OutgoingLinkProps } from '@47ng/chakra-next'
import { IconButton, IconButtonProps } from '@chakra-ui/react'

export interface OutgoingIconButtonLinkProps
  extends Omit<OutgoingLinkProps, 'size' | 'aria-label'>,
    Pick<
      IconButtonProps,
      'icon' | 'aria-label' | 'variant' | 'variantColor' | 'size' | 'isRound'
    > {}

export const OutgoingIconButtonLink: React.FC<OutgoingIconButtonLinkProps> = ({
  ...props
}) => {
  return <IconButton as={OutgoingLink} {...(props as any)} />
}
