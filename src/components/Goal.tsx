import React from 'react'
import {
  Text,
  ListIcon,
  ListItem,
  ListItemProps,
  Progress,
  ProgressProps,
  useColorModeValue
} from '@chakra-ui/react'
import {
  FiCheckCircle,
  FiCircle,
  FiMinusCircle,
  FiXCircle
} from 'react-icons/fi'

export interface GoalProps extends ListItemProps {
  status?: 'inProgress' | 'done' | 'failed'
  progress?: number
  progressProps?: ProgressProps
}

export const Goal: React.FC<GoalProps> = ({
  status,
  progress,
  progressProps = {},
  children,
  ...props
}) => {
  const icon = {
    inProgress: FiMinusCircle,
    done: FiCheckCircle,
    failed: FiXCircle,
    default: FiCircle
  }[status ?? 'default']

  const iconAccent = {
    inProgress: 'gray',
    done: 'green',
    failed: 'red',
    default: 'gray'
  }[status ?? 'default']

  return (
    <ListItem {...props} display="flex" alignItems="center">
      <ListIcon
        as={icon}
        color={useColorModeValue(`${iconAccent}.500`, `${iconAccent}.400`)}
      />
      <Text>{children}</Text>
      {progress !== undefined && (
        <React.Fragment>
          <Text fontSize="xs" ml="auto" color="gray.600">
            {progress} / {progressProps.max ?? 100}
          </Text>
          <Progress
            value={progress}
            w={16}
            size="sm"
            colorScheme="accent"
            rounded="full"
            ml={2}
            {...progressProps}
          />
        </React.Fragment>
      )}
    </ListItem>
  )
}
