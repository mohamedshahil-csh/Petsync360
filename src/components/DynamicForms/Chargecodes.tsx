export const getChargeFormSchema = (taxCodeOptions: { label: string; value: string }[] = [], providerOptions: { label: string; value: string }[] = []) => ({
  title: "Charge Code Form",
  fields: [
    {
      name: "provider_id",
      label: "Veterinarian",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Enter Speciality",
      options: providerOptions,
      required: true,
    },
    {
      name: "charge_code",
      label: "Charge Code",
      type: "text",
      fieldType: "text",
      placeholder: "Enter charge code",
      required: true,
    },
    {
      name: "service_name",
      label: "Service Name",
      type: "text",
      fieldType: "text",
      placeholder: "Enter service name",
      required: true,
    },
    {
      name: "service_type",
      label: "Service Type",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Enter service type",
      "options": [
        { "label": "Walk In", "value": "Walk In" },
        { "label": "Home Visit", "value": "Home Visit" },
        { "label": "Tele Consult", "value": "Tele Consult" },
      ],
      required: true,
    },
    {
      name: "tax_codes",
      label: "Tax Codes",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Select tax code",
      options: taxCodeOptions,
      required: false,
      multiple: true
    },
    {
      name: "amount",
      label: "Amount (₹)",
      type: "number",
      fieldType: "number",
      placeholder: "Enter amount",
      required: true,
    },

  ],
});

export const getTaxFormSchema = () => ({
  title: "Charge Code Form",
  fields: [

    {
      name: "code",
      label: "Tax Code",
      type: "text",
      fieldType: "text",
      placeholder: "Enter code",
      required: true,
    },
    {
      name: "name",
      label: "Tax Name",
      type: "text",
      fieldType: "text",
      placeholder: "Enter Tax name",
      required: true,
    },
    {
      name: "type",
      label: "Tax Type",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Enter service type",
      "options": [
        { "label": "Percentage (%)", "value": "percentage" },
        { "label": "ADHOC (₹)", "value": "adhoc" },
      ],
      required: true,
    },
    {
      name: "rate",
      label: "Rate",
      type: "number",
      fieldType: "number",
      placeholder: "Enter rate",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Enter Status",
      "options": [
        { "label": "Active", "value": "1" },
        { "label": "Inactive", "value": "0" },
      ],
      required: true,
    },
  ],
});

export const getAppointmentFormSchema = (vets: { label: string; value: string }[] = []) => ({
  title: "Appointments",
  fields: [
    {
      name: "charge_datetime",
      label: "Charge Date & Time",
      type: "datetime-local",
      fieldType: "datetime-local",
      placeholder: "Select date and time",
      required: true,
    },
    {
      name: "provider_id",
      label: "Veterinarian",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Enter Speciality",
      options: vets,
      required: true,
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Select Status",
      options: [
        { label: "New", value: "NEW" },
        { label: "Started", value: "STARTED" },
        { label: "Waiting", value: "WAITING" },
        { label: "Ended", value: "ENDED" },
        { label: "Failed", value: "FAILED" },
        { label: "Cancelled", value: "CANCELLED" },
        { label: "Expired", value: "EXPIRED" },
        { label: "Unpaid", value: "UNPAID" },
        { label: "Paid", value: "PAID" },
        { label: "Pending", value: "PENDING" },
        { label: "Accepted", value: "ACCEPTED" },
        { label: "Created", value: "CREATED" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Vet Accepted", value: "VET ACCEPTED" },
        { label: "Payment Pending", value: "PAYMENT PENDING" },
        { label: "Confirmed", value: "CONFIRMED" },
        { label: "Link Ready", value: "LINK READY" },
        { label: "Vet Joined", value: "VET JOINED" },
        { label: "Joined (You)", value: "JOINED (YOU)" },
        { label: "In Progress", value: "INPROGRESS" },
        { label: "Cancelled (Vet)", value: "CANCELLED (VET)" },
        { label: "Cancelled (You)", value: "CANCELLED (YOU)" },
        { label: "Reschedule Requested", value: "RESCHEDULE REQUESTED" },
        { label: "Rescheduled", value: "RESCHEDULED" },
        { label: "Reschedule Rejected", value: "RESCHEDULE REJECTED" },
        { label: "No Show (You)", value: "NO SHOW (YOU)" },
        { label: "No Show (Vet)", value: "NO SHOW (VET)" },
        { label: "Refund Pending", value: "REFUND PENDING" },
        { label: "Refunded", value: "REFUNDED" },
        { label: "Refund Failed", value: "REFUND FAILED" },
        { label: "Refund Initiated", value: "REFUND INITIATED" }
      ],
      required: true,
    }


  ],
});