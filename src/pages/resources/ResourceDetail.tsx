import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLaunchById } from '../../api/resourceApi';
import '../../styles/resourceDetail.scss';
import { Card, Text, Title, Badge, Button, Divider, Group, Stack, Image, Loader } from '@mantine/core';
import { useAppStore } from '../../store/app.store';
import Header from '../../components/Header';

const ResourceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setLaunchDetails, launchDetails } = useAppStore();

    const { data, isLoading, isError } = useGetLaunchById(id!);

    useEffect(() => {
        if (data) {
            setLaunchDetails(data);
        }
    }, [data, setLaunchDetails]);

    const handleEnrichData = (id: string | number | null | undefined) => {
        if (id) {
            navigate(`/enrich/${id}`);
        }
    };

    if (isLoading) {
        return (
            <div className="center-loader">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return <Text align="center" mt="xl">Error loading launch details.</Text>;
    }

    const handleViewMore = (launchpadId: string | undefined) => {
        if (launchpadId) {
            navigate(`/launchpadDetails/${launchpadId}`);
        }
    };

    return (
        <div>
            <Header />
            <section className="sectioncontainer">
                <div className="inner">
                    <Card shadow="sm" padding="lg" radius="md" className="resource-card" >
                        <Group position="apart" align="flex-start" spacing="lg">
                            <Card radius="md" withBorder className="first-column">
                                <Stack>
                                    <Text weight={700} size="xl">
                                        {launchDetails?.name || 'N/A'}
                                    </Text>
                                    <Divider my="lg" color="gray" />
                                    <Group spacing="xs">
                                        <Text weight={400} size="md">Flight Number:</Text>
                                        <Text size="md">{launchDetails?.flight_number || 'N/A'}</Text>
                                    </Group>
                                    <Divider my="lg" color="gray" />
                                    <Group spacing="xs">
                                        <Text weight={400} size="md">Launch Date (UTC):</Text>
                                        <Text size="md">{new Date(launchDetails?.date_utc || '').toUTCString()}</Text>
                                    </Group>
                                    <Divider my="lg" color="gray" />
                                    <Title order={4} color="white">Core Details</Title>
                                    {launchDetails?.cores?.map((core, index) => (
                                        <Card key={index} shadow="sm" radius="md" withBorder className="core-card">
                                            <Stack spacing="xs">
                                                <Text>Core ID: {core.core || 'N/A'}</Text>
                                                <Text>Flight: {core.flight || 'N/A'}</Text>
                                                <Text>Reused: {core.reused ? 'Yes' : 'No'}</Text>
                                                <Text>Landing Attempt: {core.landing_attempt ? 'Yes' : 'No'}</Text>
                                                <Text>Landing Success: {core.landing_success ? 'Yes' : 'No'}</Text>
                                            </Stack>
                                        </Card>
                                    ))}
                                    <Divider my="lg" color="gray" />
                                    <Stack spacing="xs">
                                        <Text weight={500} size="md">Mission Patch:</Text>
                                        {launchDetails?.links?.patch?.large ? (
                                            <Image
                                                src={launchDetails.links.patch.large}
                                                alt="Mission Patch Large"
                                                radius="md"
                                                width={150}
                                            />
                                        ) : (
                                            <Text>No patch available</Text>
                                        )}
                                    </Stack>
                                </Stack>
                            </Card>

                            <Card radius="md" withBorder className="second-column">
                                <Stack spacing="lg">
                                    <Text>{launchDetails?.details || 'No details available'}</Text>
                                    <Group spacing="xs">
                                        <Text weight={500}>Rocket ID:</Text>
                                        <Text>{launchDetails?.rocket || 'N/A'}</Text>
                                    </Group>
                                    <Group spacing="xs">
                                        <Text weight={500}>Launchpad ID:</Text>
                                        <Text>{launchDetails?.launchpad || 'N/A'}</Text>
                                        <Button
                                            onClick={() => handleViewMore(launchDetails?.launchpad)}
                                            variant="outline"
                                            color="white"
                                            className="view-more-button"
                                        >
                                            View More
                                        </Button>
                                    </Group>
                                    <Group spacing="xs">
                                        <Text weight={500}>Success:</Text>
                                        <Badge color={launchDetails?.success ? 'green' : 'red'} variant="filled">
                                            {launchDetails?.success ? 'Yes' : 'No'}
                                        </Badge>
                                    </Group>
                                    <Group spacing="xs">
                                        <Text weight={500}>Article:</Text>
                                        {launchDetails?.links?.article ? (
                                            <a
                                                href={launchDetails.links.article}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="link"
                                            >
                                                {launchDetails.links.article}
                                            </a>
                                        ) : (
                                            <Text>N/A</Text>
                                        )}
                                    </Group>
                                    <Group spacing="xs">
                                        <Text weight={500}>Wikipedia:</Text>
                                        {launchDetails?.links?.wikipedia ? (
                                            <a
                                                href={launchDetails.links.wikipedia}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="link"
                                            >
                                                {launchDetails.links.wikipedia}
                                            </a>
                                        ) : (
                                            <Text>N/A</Text>
                                        )}
                                    </Group>

                                    <Stack spacing="sm" >
                                        <Text weight={500} size="md">Webcast:</Text>
                                        {launchDetails?.links?.youtube_id ? (
                                            <iframe
                                                width="50%"
                                                height="315"
                                                src={`https://www.youtube.com/embed/${launchDetails.links.youtube_id}`}
                                                title="Webcast"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="webcast-frame"
                                            ></iframe>
                                        ) : (
                                            <Text>No webcast available</Text>
                                        )}
                                        <Button
                                            onClick={() => handleEnrichData(launchDetails?.rocket)}
                                            variant="outline"
                                            color="white"
                                            className='enrich-button'
                                        >
                                            Enrich Rocket Data
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Card>
                        </Group>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default ResourceDetail;