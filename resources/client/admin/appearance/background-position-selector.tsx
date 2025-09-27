import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {message} from '@common/i18n/message';
import {Trans} from '@common/i18n/trans';
import {RadioGroup} from '@common/ui/forms/radio-group/radio-group';
import {Radio} from '@common/ui/forms/radio-group/radio';

interface ImageBackgroundConfig {
  backgroundRepeat?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
}

const BackgroundPositions: Record<
  'cover' | 'contain' | 'repeat',
  {
    label: MessageDescriptor;
    bgConfig: ImageBackgroundConfig;
  }
> = {
  cover: {
    label: message('Stretch to fit'),
    bgConfig: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  },
  contain: {
    label: message('Fit'),
    bgConfig: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center top',
    },
  },
  repeat: {
    label: message('Repeat'),
    bgConfig: {
      backgroundRepeat: 'repeat',
      backgroundSize: undefined,
      backgroundPosition: 'left top',
    },
  },
};

interface Props {
  value?: ImageBackgroundConfig;
  onChange?: (value: ImageBackgroundConfig) => void;
  className?: string;
  disabled?: boolean;
}
export function BackgroundPositionSelector({
  value: imageBgValue,
  onChange,
  className,
  disabled,
}: Props) {
  const selectedPosition = positionKeyFromValue(imageBgValue);
  return (
    <div className={className}>
      <RadioGroup size="sm" disabled={disabled}>
        {Object.entries(BackgroundPositions).map(([key, position]) => (
          <Radio
            key={key}
            name="background-position"
            value={key}
            checked={key === selectedPosition}
            onChange={e => {
              if (imageBgValue) {
                onChange?.({
                  ...imageBgValue,
                  ...position.bgConfig,
                });
              }
            }}
          >
            <Trans {...position.label} />
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}

function positionKeyFromValue(
  value?: ImageBackgroundConfig,
): keyof typeof BackgroundPositions {
  if (value?.backgroundSize === 'cover') {
    return 'cover';
  } else if (value?.backgroundSize === 'contain') {
    return 'contain';
  } else {
    return 'repeat';
  }
}
