'use client';

import * as React from 'react';
import {
  Button,
  Field,
  Input,
  Textarea,
  Dropdown,
  Option,
  makeStyles,
  shorthands,
  tokens,
  useId,
  Label,
  RadioGroup,
  Radio,
  Title2,
  Spinner,
} from '@fluentui/react-components';

// --- TanStack Query hooks ---
import { useHandlers } from '@/hooks/useHandlers';
import { useCreateTicket } from '@/hooks/useCreateTicket';

// --- Zod schema imports ---
import { TaskClassificationSchema } from '~/prisma/zod/schemas/enums/TaskClassification.schema';
import { RequestTypeSchema } from '~/prisma/zod/schemas/enums/RequestType.schema';
import { PrioritySchema } from '~/prisma/zod/schemas/enums/Priority.schema';
import { ZoneSchema } from '~/prisma/zod/schemas/enums/Zone.schema';
import { SpecificRequestTypeSchema } from '~/prisma/zod/schemas/enums/SpecificRequestType.schema';

// ====================================================================
// --- NEW IMPORT: Use the external utility file ---
import { mappedSpecificRequestOptions } from '@/utils/specificRequestTypeMap';
// ====================================================================

// --- Enum Options ---
const classificationOptions = TaskClassificationSchema.options;
const requestTypeOptions = RequestTypeSchema.options;
const priorityOptions = PrioritySchema.options;
const zoneOptions = ZoneSchema.options;
const specificRequestOptions = SpecificRequestTypeSchema.options; // Keep for initial state

// --- Styling ---
const useStyles = makeStyles({
  container: {
    ...shorthands.padding(
      tokens.spacingVerticalXXL,
      tokens.spacingHorizontalXXL,
      tokens.spacingVerticalM,
      tokens.spacingHorizontalXXL
    ),
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('28px'),
    '@media (max-width: 768px)': {
      ...shorthands.padding(
        tokens.spacingVerticalXL,
        tokens.spacingHorizontalL,
        tokens.spacingVerticalM,
        tokens.spacingHorizontalL
      ),
    },
  },
  title: {
    borderBottom: `2px solid ${tokens.colorBrandBackground}`,
    paddingBottom: '8px',
    marginBottom: '4px',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeHero700,
  },
  formLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap('24px'),
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      ...shorthands.gap('20px'),
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      ...shorthands.gap('16px'),
    },
  },
  fullWidth: {
    gridColumnStart: 1,
    gridColumnEnd: 4,
    '@media (max-width: 1200px)': { gridColumnEnd: 3 },
    '@media (max-width: 768px)': { gridColumnEnd: 2 },
  },
  submitButton: {
    marginTop: '10px',
    width: 'fit-content',
    fontWeight: tokens.fontWeightSemibold,
    '@media (max-width: 768px)': { width: '100%' },
  },
  // ====================================================================
  // --- NEW STYLES FOR RADIO GROUP RESPONSIVENESS ---
  radioGroupResponsive: {
    // Fluent UI's RadioGroup with layout="horizontal" uses display: flex internally.
    // We target that flex container for responsiveness.
    // This targets screens up to 768px (standard mobile/tablet breakpoint)
    '@media (max-width: 768px)': {
      // Force wrapping of the items
      flexWrap: 'wrap',
      // Ensure all radio buttons are given 50% width so two fit per row.
      '> *': { // Target the direct children (the individual Radio components)
        width: '50%',
        boxSizing: 'border-box', // Include padding/border in the 50% width
      },
    },
  },
  // ====================================================================
});

// --- Types ---
interface Handler {
  id: string;
  name: string;
}

interface TicketState {
  serviceNumber: string;
  tasksClassification: string;
  requestType: string;
  specificRequestType: string;
  zone: string;
  handlerId: string;
  remarks: string;
  priority: string;
}

// --- Component ---
const TTForm: React.FC = () => {
  const styles = useStyles();
  const serviceNumberId = useId('serviceNumber-input');

  // --- TanStack Query hooks ---
  const { data: handlers, isLoading: isLoadingHandlers } = useHandlers(); // Already typed inside hook
  const createTicket = useCreateTicket();

  // --- Form state ---
  const [ticket, setTicket] = React.useState<TicketState>({
    serviceNumber: '',
    tasksClassification: classificationOptions[0],
    requestType: requestTypeOptions[0],
    specificRequestType: specificRequestOptions[0],
    zone: zoneOptions[0],
    handlerId: '',
    remarks: '',
    priority: priorityOptions[1], // Medium
  });

  // --- Set first handler by default ---
  React.useEffect(() => {
    if (handlers && handlers.length > 0 && !ticket.handlerId) {
      setTicket(prev => ({ ...prev, handlerId: handlers[0].id }));
    }
  }, [handlers, ticket.handlerId]);

  const handleChange = (field: keyof TicketState, value: string) =>
    setTicket(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket.mutate(ticket, {
      onSuccess: () => {
        alert('✅ Trouble Ticket Submitted Successfully!');
        setTicket({
          serviceNumber: '',
          tasksClassification: classificationOptions[0],
          requestType: requestTypeOptions[0],
          specificRequestType: specificRequestOptions[0],
          zone: zoneOptions[0],
          handlerId: handlers?.[0]?.id || '',
          remarks: '',
          priority: priorityOptions[1],
        });
      },
      onError: (error: any) => {
        alert(`❌ ${error.message}`);
      },
    });
  };

  const isFormInvalid =
    !ticket.serviceNumber ||
    !ticket.tasksClassification ||
    !ticket.specificRequestType ||
    !ticket.zone ||
    !ticket.handlerId ||
    !ticket.remarks;

  // Get the display label for the currently selected LONG Prisma value
  const currentSpecificRequestLabel = React.useMemo(() => {
    const selectedOption = mappedSpecificRequestOptions.find(opt => opt.value === ticket.specificRequestType);
    return selectedOption?.label || ticket.specificRequestType;
  }, [ticket.specificRequestType]);

  return (
    <div className={styles.container}>
      <Title2 className={styles.title}>FSASS Section Ticket Creation</Title2>
      <Label size="large" weight="semibold">
        Mandatory fields are marked with an asterisk (*). Please ensure accuracy for efficient task handling.
      </Label>

      <form onSubmit={handleSubmit}>
        <div className={styles.formLayout}>
          {/* Service Number */}
          <Field
            label="Service Number *"
            required
            validationMessage={!ticket.serviceNumber && !createTicket.isPending ? 'Service Number is required.' : undefined}
          >
            <Input
              id={serviceNumberId}
              placeholder="e.g., 2519xxxxxx "
              value={ticket.serviceNumber}
              onChange={e => handleChange('serviceNumber', e.target.value)}
              disabled={createTicket.isPending}
            />
          </Field>

          {/* Handler */}
          <Field label="Handler / Assigned Agent *" required>
            <Dropdown
              placeholder="Select Handling Agent"
              selectedOptions={handlers?.filter(h => h.id === ticket.handlerId).map(h => h.name) || []}
              onOptionSelect={(_, data) => handleChange('handlerId', data.optionValue as string)}
              disabled={isLoadingHandlers || createTicket.isPending}
            >
              {handlers?.map((handler: Handler) => (
                <Option key={handler.id} value={handler.id}>
                  {handler.name}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* Priority */}
          <Field label="Priority *" required>
            <RadioGroup
              layout="horizontal"
              // ADDED CLASS HERE
              className={styles.radioGroupResponsive} 
              value={ticket.priority}
              onChange={(_, data) => handleChange('priority', data.value)}
              disabled={createTicket.isPending}
            >
              {priorityOptions.map(level => (
                <Radio key={level} value={level} label={level} />
              ))}
            </RadioGroup>
          </Field>

          {/* Task Classification */}
          <Field label="Task Classification *" required>
            <Dropdown
              placeholder="Select Task Category"
              selectedOptions={[ticket.tasksClassification]}
              onOptionSelect={(_, data) => handleChange('tasksClassification', data.optionText || '')}
              disabled={createTicket.isPending}
            >
              {classificationOptions.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* Zone */}
          <Field label="Zone/Region *" required>
            <Dropdown
              placeholder="Select Zone or Region"
              selectedOptions={[ticket.zone]}
              onOptionSelect={(_, data) => handleChange('zone', data.optionText || '')}
              disabled={createTicket.isPending}
            >
              {zoneOptions.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* Request Type */}
          <Field label="Request Source/Type *" required>
            <RadioGroup
              layout="horizontal"
              // ADDED CLASS HERE
              className={styles.radioGroupResponsive}
              value={ticket.requestType}
              onChange={(_, data) => handleChange('requestType', data.value)}
              disabled={createTicket.isPending}
            >
              {requestTypeOptions.map(type => (
                <Radio key={type} value={type} label={type} />
              ))}
            </RadioGroup>
          </Field>

          {/* Specific Request - MODIFIED DROPDOWN to use external map */}
          <Field
            className={styles.fullWidth}
            label="Specific Request Type *"
            required
            hint="Select the specific code matching the required task."
          >
            <Dropdown
              placeholder={currentSpecificRequestLabel}
              // Set selectedOptions to the calculated label for correct display
              selectedOptions={[currentSpecificRequestLabel]}
              // IMPORTANT: onOptionSelect must use data.optionValue, which is the long Prisma value
              onOptionSelect={(_, data) => handleChange('specificRequestType', data.optionValue as string)}
              disabled={createTicket.isPending}
            >
              {/* Use the mapped array from the utility file */}
              {mappedSpecificRequestOptions.map(option => (
                <Option 
                  key={option.value} 
                  value={option.value} // The actual value submitted (LONG Prisma enum)
                  title={option.description} // Full description for hover
                  // FIX: Add the required 'text' prop for Fluent UI Dropdown functionality
                  text={option.label}
                >
                  {option.description} {/* The user-friendly display text */}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* Remarks */}
          <Field
            className={styles.fullWidth}
            label="Detailed Request Description / Remarks *"
            required
            hint="Provide context, required actions, and any customer contact information."
          >
            <Textarea
              resize="vertical"
              rows={5}
              placeholder="Start typing the details here..."
              value={ticket.remarks}
              onChange={e => handleChange('remarks', e.target.value)}
              disabled={createTicket.isPending}
            />
          </Field>
        </div>

        {/* Submit Button */}
        <Button
          className={styles.submitButton}
          type="submit"
          appearance="primary"
          size="large"
          disabled={createTicket.isPending || isFormInvalid}
        >
          {createTicket.isPending ? (
            <>
              <Spinner size="tiny" /> Creating Ticket...
            </>
          ) : (
            'Create Trouble Ticket'
          )}
        </Button>
      </form>
    </div>
  );
};

export default TTForm;