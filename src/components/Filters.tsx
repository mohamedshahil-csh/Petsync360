import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormGroup,
    RadioGroup,
    Radio,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
type Option = { value: string; label: string };

type FilterType =
    | {
        type: 'search';
        label: string;
        value: string;
        onChange: (v: string) => void;
    }
    | {
        type: 'select';
        label: string;
        value: string;
        onChange: (v: string) => void;
        options: Option[];
    }
    | {
        type: 'checkbox';
        label: string;
        value: boolean;
        onChange: (v: boolean) => void;
    }
    | {
        type: 'checkbox-multi';
        label: string;
        value: string[]; // multiple selected values
        onChange: (v: string[]) => void;
        options: Option[];
    }
    | {
        type: 'radio';
        label: string;
        value: string;
        onChange: (v: string) => void;
        options: Option[];
    }
    | {
        type: 'date';
        label: string;
        value: Date | null;
        onChange: (v: Date | null) => void;
    }
    | {
        type: 'date-range';
        label: string;
        value: { from: Date | null; to: Date | null };
        onChange: (v: { from: Date | null; to: Date | null }) => void;
    }
    | {
        type: 'number-range';
        label: string;
        value: { min: number | ''; max: number | '' };
        onChange: (v: { min: number | ''; max: number | '' }) => void;
    };

interface FiltersProps {
    filters: FilterType[];
    onFilterChange?: () => void; // optional callback when any filter changes
}

const Filters: React.FC<{ filters: FilterType[]; onFilterChange?: () => void }> = ({
    filters,
    onFilterChange,
}) => {
    return (
        <Box display="flex" gap={2} mb={4} flexWrap="wrap">
            {filters.map((filter, idx) => {
                switch (filter.type) {
                    case 'search':
                        return (
                            <TextField
                                key={idx}
                                label={filter.label}
                                value={filter.value}
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: 250 }}
                                onChange={(e) => {
                                    filter.onChange(e.target.value);
                                    onFilterChange?.();
                                }}
                            />
                        );

                    case 'select':
                        return (
                            <FormControl key={idx} size="small" sx={{ minWidth: 200 }}>
                                <InputLabel id={`select-label-${idx}`}>{filter.label}</InputLabel>
                                <Select
                                    labelId={`select-label-${idx}`}
                                    id={`select-${idx}`}
                                    value={filter.value}
                                    label={filter.label}
                                    onChange={(e) => {
                                        filter.onChange(e.target.value);
                                        onFilterChange?.();
                                    }}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    {filter.options.map((opt) => (
                                        <MenuItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        );

                    case 'checkbox':
                        return (
                            <FormControlLabel
                                key={idx}
                                control={
                                    <Checkbox
                                        checked={filter.value}
                                        onChange={(e) => {
                                            filter.onChange(e.target.checked);
                                            onFilterChange?.();
                                        }}
                                    />
                                }
                                label={filter.label}
                            />
                        );

                    case 'checkbox-multi':
                        return (
                            <FormControl key={idx} component="fieldset" sx={{ minWidth: 200 }}>
                                <InputLabel shrink>{filter.label}</InputLabel>
                                <FormGroup>
                                    {filter.options.map((opt) => (
                                        <FormControlLabel
                                            key={opt.value}
                                            control={
                                                <Checkbox
                                                    checked={filter.value.includes(opt.value)}
                                                    onChange={(e) => {
                                                        let newValues = [...filter.value];
                                                        if (e.target.checked) {
                                                            newValues.push(opt.value);
                                                        } else {
                                                            newValues = newValues.filter((v) => v !== opt.value);
                                                        }
                                                        filter.onChange(newValues);
                                                        onFilterChange?.();
                                                    }}
                                                />
                                            }
                                            label={opt.label}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        );

                    case 'radio':
                        return (
                            <FormControl key={idx} component="fieldset" sx={{ minWidth: 200 }}>
                                <InputLabel shrink>{filter.label}</InputLabel>
                                <RadioGroup
                                    value={filter.value}
                                    onChange={(e) => {
                                        filter.onChange(e.target.value);
                                        onFilterChange?.();
                                    }}
                                >
                                    {filter.options.map((opt) => (
                                        <FormControlLabel
                                            key={opt.value}
                                            value={opt.value}
                                            control={<Radio />}
                                            label={opt.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        );

                    case 'date':
                        return (
                            <LocalizationProvider dateAdapter={AdapterDateFns} key={idx}>
                                <DatePicker
                                    label={filter.label}
                                    value={filter.value}
                                    onChange={(newValue) => {
                                        filter.onChange(newValue);
                                        onFilterChange?.();
                                    }}
                                    slotProps={{
                                        textField: { size: 'small', fullWidth: true },
                                    }}
                                />
                            </LocalizationProvider>
                        );

                    case 'date-range':
                        return (
                            <LocalizationProvider dateAdapter={AdapterDateFns} key={idx}>
                                <DateRangePicker
                                    value={[filter.value.from, filter.value.to]}
                                    onChange={(newValue) => {
                                        filter.onChange({ from: newValue[0], to: newValue[1] });
                                        onFilterChange?.();
                                    }}
                                    slotProps={{
                                        startField: { label: `${filter.label} From`, size: 'small', fullWidth: true },
                                        endField: { label: `${filter.label} To`, size: 'small', fullWidth: true },
                                    } as any}
                                />

                            </LocalizationProvider>
                        );
                    case 'number-range':
                        return (
                            <Box
                                key={idx}
                                display="flex"
                                gap={1}
                                alignItems="center"
                                sx={{ minWidth: 300 }}
                            >
                                <TextField
                                    label={`${filter.label} Min`}
                                    type="number"
                                    size="small"
                                    value={filter.value.min}
                                    onChange={(e) => {
                                        const val = e.target.value === '' ? '' : Number(e.target.value);
                                        filter.onChange({ ...filter.value, min: val });
                                        onFilterChange?.();
                                    }}
                                />
                                <TextField
                                    label={`${filter.label} Max`}
                                    type="number"
                                    size="small"
                                    value={filter.value.max}
                                    onChange={(e) => {
                                        const val = e.target.value === '' ? '' : Number(e.target.value);
                                        filter.onChange({ ...filter.value, max: val });
                                        onFilterChange?.();
                                    }}
                                />
                            </Box>
                        );

                    default:
                        return null;
                }
            })}
        </Box>
    );
};

export default Filters;
