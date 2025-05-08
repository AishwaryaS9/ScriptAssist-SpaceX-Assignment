import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TextInput,
    Button,
    Card,
    Container,
    Group,
    Text,
    Pagination,
    Select,
    Loader,
    ScrollArea,
    Badge,
} from "@mantine/core";

import { useGetLaunches } from "../../api/resourceApi";
import Header from "../../components/Header";
import "../../styles/resourceList.scss";
import { Resource } from "../../utils/interface";

const ResourceList = () => {
    const navigate = useNavigate();

    const { data: resources = [], isLoading, isError } = useGetLaunches();

    const [search, setSearch] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("name-asc");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const filteredResources: Resource[] = resources.filter((resource: Resource) =>
        resource.name.toLowerCase().includes(search.toLowerCase())
    );

    const sortedResources = filteredResources.sort((a: Resource, b: Resource) => {
        const [field, order] = sortOption.split("-");
        const aField = field === "date" ? new Date(a.date_utc) : (a as any)[field];
        const bField = field === "date" ? new Date(b.date_utc) : (b as any)[field];

        if (aField < bField) return order === "asc" ? -1 : 1;
        if (aField > bField) return order === "asc" ? 1 : -1;
        return 0;
    });

    const currentPageData = sortedResources.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleResourceDetail = (id: string) => {
        navigate(`/resource/${id}`);
    };

    const handleResetFilters = () => {
        setSearch("");
        setSortOption("name-asc");
        setCurrentPage(1);
    };

    const handleSortOptionChange = (value: string | null) => {
        if (value) {
            setSortOption(value);
        }
    };

    if (isLoading)
        return (
            <div className="center-loader">
                <Loader />
            </div>
        );
    if (isError) return <p>Failed to load resources.</p>;

    return (
        <div>
            <Header />
            <div className="resourceListContainer">
                <Container className="resource-list-content" >
                    <Card shadow="xl" radius="lg" withBorder>
                        <Group position="apart" mb="md">
                            <Text size="lg" weight={600} color="#361759">
                                Resource List
                            </Text>
                            <Group>
                                <TextInput
                                    placeholder="Search by name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    radius="xl"
                                />
                                <Select
                                    placeholder="Sort by"
                                    value={sortOption}
                                    onChange={handleSortOptionChange}
                                    data={[
                                        { value: "name-asc", label: "Name (A-Z)" },
                                        { value: "name-desc", label: "Name (Z-A)" },
                                        { value: "date-asc", label: "Date (Oldest)" },
                                        { value: "date-desc", label: "Date (Newest)" },
                                        { value: "success-asc", label: "Status (Failure first)" },
                                        { value: "success-desc", label: "Status (Success first)" },
                                    ]}
                                    radius="xl"
                                />
                            </Group>
                        </Group>
                        <Group position="right" mb="md">
                            <Button className="reset-button" variant="outline" color="gray" onClick={handleResetFilters}>
                                Reset Filters
                            </Button>
                        </Group>
                        <ScrollArea>
                            <Table striped highlightOnHover className="styled-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageData.length > 0 ? (
                                        currentPageData.map((resource: Resource) => (
                                            <tr key={resource.id}>
                                                <td>{resource.name}</td>
                                                <td>{new Date(resource.date_utc).toLocaleDateString()}</td>
                                                <td>
                                                    <Badge
                                                        color={resource.success ? "green" : "red"}
                                                        variant="filled"
                                                    >
                                                        {resource.success ? "Success" : "Failure"}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Button
                                                        size="xs"
                                                        onClick={() => handleResourceDetail(resource.id)}
                                                        radius="xl"
                                                    >
                                                        Enrich
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="no-resources">
                                                No resources found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </ScrollArea>
                        <Pagination
                            value={currentPage}
                            onChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            total={Math.ceil(sortedResources.length / itemsPerPage)}
                            className="pagination"
                        />
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default ResourceList;
