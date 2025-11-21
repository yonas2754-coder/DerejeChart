'use client';

import * as React from 'react';

// --- Fluent UI Imports ---
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
  type DropdownProps,
  type RadioGroupProps,
} from '@fluentui/react-components';

// --- Hooks & Utils ---
import { useHandlers } from '@/hooks/useHandlers';
import { useCreateTicket } from '@/hooks/useCreateTicket';
import { mappedSpecificRequestOptions } from '@/utils/specificRequestTypeMap';

// --- Zod Schemas & Enums ---
import { TaskClassificationSchema } from '~/prisma/zod/schemas/enums/TaskClassification.schema';
import { RequestTypeSchema } from '~/prisma/zod/schemas/enums/RequestType.schema';
import { PrioritySchema } from '~/prisma/zod/schemas/enums/Priority.schema';
import { ZoneSchema } from '~/prisma/zod/schemas/enums/Zone.schema';
import { SpecificRequestTypeSchema } from '~/prisma/zod/schemas/enums/SpecificRequestType.schema';

// ====================================================================
// --- CONSTANTS & OPTIONS ---
// ====================================================================

const OPTIONS = {
  classification: TaskClassificationSchema.options,
  requestType: RequestTypeSchema.options,
  priority: PrioritySchema.options,
  zone: ZoneSchema.options,
  specificRequest: SpecificRequestTypeSchema.options,
};

const DEFAULT_HANDLER_NAME = 'system';

// ====================================================================
// --- STYLES ---
// ====================================================================

const useStyles = makeStyles({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('28px'),
    ...shorthands.padding(
      tokens.spacingVerticalXXL,
      tokens.spacingHorizontalXXL,
      tokens.spacingVerticalM,
      tokens.spacingHorizontalXXL
    ),
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
  radioGroupResponsive: {
    '@media (max-width: 768px)': {
      flexWrap: 'wrap',
      '> *': {
        width: '50%',
        boxSizing: 'border-box',
      },
    },
  },
});

// ====================================================================
// --- TYPES ---
// ====================================================================

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

// ====================================================================
// --- COMPONENT ---
// ====================================================================

const TTForm: React.FC = () => {
  const styles = useStyles();
  const serviceNumberId = useId('serviceNumber-input');

  // --- Data Fetching ---
  const { data: handlers, isLoading: isLoadingHandlers } = useHandlers();
  const createTicket = useCreateTicket();

  // --- Form State ---
  const [ticket, setTicket] = React.useState<TicketState>({
    serviceNumber: '',
    tasksClassification: OPTIONS.classification[0],
    requestType: OPTIONS.requestType[0],
    specificRequestType: OPTIONS.specificRequest[0],
    zone: OPTIONS.zone[0],
    handlerId: '', // Will be set by useEffect
    remarks: '',
    priority: OPTIONS.priority[1], // Medium
  });

  // --- Derived State (Memoized for Performance & Clean JSX) ---
  
  // 1. Get the display name for the selected Handler
  const currentHandlerName = React.useMemo(() => {
    return handlers?.find((h) => h.id === ticket.handlerId)?.name || '';
  }, [handlers, ticket.handlerId]);

  // 2. Get the selected Handler ID as an array (for Dropdown checkmark)
  const selectedHandlerIds = React.useMemo(() => {
    return ticket.handlerId ? [ticket.handlerId] : [];
  }, [ticket.handlerId]);

  // 3. Get the display label for the Specific Request Type
  const currentSpecificRequestLabel = React.useMemo(() => {
    const selectedOption = mappedSpecificRequestOptions.find(
      (opt) => opt.value === ticket.specificRequestType
    );
    return selectedOption?.label || '';
  }, [ticket.specificRequestType]);

  // --- Effects ---

  // Effect: Set default handler to 'system' on load
  React.useEffect(() => {
    if (handlers && handlers.length > 0 && !ticket.handlerId) {
      const systemHandler = handlers.find((h) => h.name === DEFAULT_HANDLER_NAME);
      
      if (systemHandler) {
        setTicket((prev) => ({ ...prev, handlerId: systemHandler.id }));
      } else {
        // Fallback if system user doesn't exist
        setTicket((prev) => ({ ...prev, handlerId: handlers[0].id }));
      }
    }
  }, [handlers, ticket.handlerId]);

  // --- Handlers ---

  const handleChange = (field: keyof TicketState, value: string) => {
    setTicket((prev) => ({ ...prev, [field]: value }));
  };

  const onDropdownChange = (field: keyof TicketState): DropdownProps['onOptionSelect'] => 
    (_, data) => {
      handleChange(field, data.optionValue as string);
    };

  const onRadioChange: RadioGroupProps['onChange'] = (_, data) => {
      handleChange('requestType', data.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug log for verifying payload before submission
    console.log('Submitting Ticket Payload:', ticket);

    createTicket.mutate(ticket, {
      onSuccess: () => {
        alert('✅ Trouble Ticket Submitted Successfully!');
        
        // Reset form logic
        const defaultHandlerId = handlers?.find((h) => h.name === DEFAULT_HANDLER_NAME)?.id 
                               || handlers?.[0]?.id 
                               || '';

        setTicket({
          serviceNumber: '',
          tasksClassification: OPTIONS.classification[0],
          requestType: OPTIONS.requestType[0],
          specificRequestType: OPTIONS.specificRequest[0],
          zone: OPTIONS.zone[0],
          handlerId: defaultHandlerId,
          remarks: '',
          priority: OPTIONS.priority[1],
        });
      },
      onError: (error: any) => {
        console.error("Submission Error:", error);
        const message = error.response?.data?.error || error.message || 'Unknown error';
        alert(`❌ Failed to create ticket. Details: ${message}`);
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

  // ====================================================================
  // --- RENDER ---
  // ====================================================================

  return (
    <div className={styles.container}>
      <Title2 className={styles.title}>FSASS Section Ticket Creation</Title2>
      <Label size="large" weight="semibold">
        Mandatory fields are marked with an asterisk (*). Please ensure accuracy for efficient task handling.
      </Label>

      <form onSubmit={handleSubmit}>
        <div className={styles.formLayout}>
          
          {/* --- Service Number --- */}
          <Field
            label="Service Number *"
            required
            validationMessage={!ticket.serviceNumber && !createTicket.isPending ? 'Service Number is required.' : undefined}
          >
            <Input
              id={serviceNumberId}
              placeholder="e.g., 2519xxxxxx "
              value={ticket.serviceNumber}
              onChange={(e) => handleChange('serviceNumber', e.target.value)}
              disabled={createTicket.isPending}
            />
          </Field>

          {/* --- Handler / Assigned Agent --- */}
          <Field label="Handler / Assigned Agent *" required>
            <Dropdown
              placeholder="Select Handling Agent"
              value={currentHandlerName}          // Display Text: Name
              selectedOptions={selectedHandlerIds} // Checkmark Logic: ID
              onOptionSelect={onDropdownChange('handlerId')}
              disabled={isLoadingHandlers || createTicket.isPending}
            >
              {handlers?.map((handler: Handler) => (
                <Option key={handler.id} value={handler.id}>
                  {handler.name}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* --- Priority --- */}
          <Field label="Priority *" required>
            <RadioGroup
              layout="horizontal"
              className={styles.radioGroupResponsive}
              value={ticket.priority}
              onChange={(_, data) => handleChange('priority', data.value)}
              disabled={createTicket.isPending}
            >
              {OPTIONS.priority.map((level) => (
                <Radio key={level} value={level} label={level} />
              ))}
            </RadioGroup>
          </Field>

          {/* --- Task Classification --- */}
          <Field label="Task Classification *" required>
            <Dropdown
              placeholder="Select Task Category"
              value={ticket.tasksClassification}
              selectedOptions={[ticket.tasksClassification]}
              onOptionSelect={(_, data) => handleChange('tasksClassification', data.optionText || '')}
              disabled={createTicket.isPending}
            >
              {OPTIONS.classification.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* --- Zone --- */}
          <Field label="Zone/Region *" required>
            <Dropdown
              placeholder="Select Zone or Region"
              value={ticket.zone}
              selectedOptions={[ticket.zone]}
              onOptionSelect={(_, data) => handleChange('zone', data.optionText || '')}
              disabled={createTicket.isPending}
            >
              {OPTIONS.zone.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* --- Request Type --- */}
          <Field label="Request Source/Type *" required>
            <RadioGroup
              layout="horizontal"
              className={styles.radioGroupResponsive}
              value={ticket.requestType}
              onChange={onRadioChange}
              disabled={createTicket.isPending}
            >
              {OPTIONS.requestType.map((type) => (
                <Radio key={type} value={type} label={type} />
              ))}
            </RadioGroup>
          </Field>

          {/* --- Specific Request Type --- */}
          <Field
            className={styles.fullWidth}
            label="Specific Request Type *"
            required
            hint="Select the specific code matching the required task."
          >
            <Dropdown
              placeholder="Select Specific Request"
              value={currentSpecificRequestLabel}       // Display Text: Short Label
              selectedOptions={[currentSpecificRequestLabel]} // Checkmark Logic: Short Label
              onOptionSelect={onDropdownChange('specificRequestType')}
              disabled={createTicket.isPending}
            >
              {mappedSpecificRequestOptions.map((option) => (
                <Option
                  key={option.value}
                  value={option.value} // Payload: LONG Enum
                  text={option.label}  // Display/Selection: Short Label
                  title={option.description}
                >
                  {option.description}
                </Option>
              ))}
            </Dropdown>
          </Field>

          {/* --- Remarks --- */}
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
              onChange={(e) => handleChange('remarks', e.target.value)}
              disabled={createTicket.isPending}
            />
          </Field>
        </div>

        {/* --- Submit Button --- */}
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