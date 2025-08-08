import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SideBar = () => {
    return (
        <div className="w-md h-screen bg-card border border-gray-200 dark:border-gray-700 p-6 shadow-md rounded-2xl hidden lg:block">
            <h2 className="text-2xl font-medium mb-6">Filters</h2>
            {/* Skills Filter */}
            <div className="mb-6">
                <Label className="text-lg font-semibold mb-2 block">Skills</Label>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="javascript" />
                        <label
                            htmlFor="javascript"
                            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            JavaScript
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="python" />
                        <label
                            htmlFor="python"
                            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Python
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="react" />
                        <label
                            htmlFor="react"
                            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            React
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="node" />
                        <label
                            htmlFor="node"
                            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Node.js
                        </label>
                    </div>
                </div>
            </div>

            {/* Proficiency Level Filter */}
            <div className="mb-6">
                <Label className="text-lg font-semibold mb-2 block">Proficiency Level</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="beginner" />
                        <label
                            htmlFor="beginner"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Beginner
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="intermediate" />
                        <label
                            htmlFor="intermediate"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Intermediate
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="advanced" />
                        <label
                            htmlFor="advanced"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Advanced
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="expert" />
                        <label
                            htmlFor="expert"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Expert
                        </label>
                    </div>
                </div>
            </div>

            {/* Learning Goals Filter */}
            <div className="mb-6">
                <Label className="text-lg font-semibold mb-2 block">Learning Goals</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="skill-development" />
                        <label
                            htmlFor="skill-development"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Skill Development
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="career-growth" />
                        <label
                            htmlFor="career-growth"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Career Growth
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="project-collaboration" />
                        <label
                            htmlFor="project-collaboration"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Project Collaboration
                        </label>
                    </div>
                </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-6">
                <Label className="text-lg font-semibold mb-2 block">Availability</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="weekdays" />
                        <label
                            htmlFor="weekdays"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Weekdays
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="weekends" />
                        <label
                            htmlFor="weekends"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Weekends
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="flexible" />
                        <label
                            htmlFor="flexible"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Flexible
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
