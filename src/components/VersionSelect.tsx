import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

interface VersionSelectProps {
    type: string;
    value: string;
    onChange: (value: string) => void;
}

const VersionSelect = ({
    type,
    value,
    onChange,
}: VersionSelectProps): JSX.Element => {
    const [versions, setVersions] = useState<string[]>([]);

    useEffect(() => {
        if (type) {
            ipc.getVersions(type)
                .then(setVersions)
                .catch((err) => log.error(err));
        }
    }, [type]);

    return (
        <div className="flex flex-1">
            <Select
                className="flex-1"
                name="version"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {versions.length === 0 && (
                    <MenuItem disabled>Loading...</MenuItem>
                )}
                {versions.length > 0 &&
                    versions.map((version) => (
                        <MenuItem key={version} value={version}>
                            {version}
                        </MenuItem>
                    ))}
            </Select>
        </div>
    );
};

export default VersionSelect;
