import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader, Card, CardSection, Text, Group, Image, Table, Title } from "@mantine/core";
import Header from "../../components/Header";
import "../../styles/launchpadDetails.scss";
import { useGetLaunchpadById } from "../../api/resourceApi";
import { useLaunchpadStore } from "../../store/app.store";
import { Launch } from "../../utils/interface";

const LaunchpadDetails = () => {
    const { launchpadId } = useParams();
    const { isLoading, data: fetchedLaunchpad, isError } = useGetLaunchpadById(launchpadId);
    const { launchpad, setLaunchpad } = useLaunchpadStore();

    useEffect(() => {
        if (fetchedLaunchpad) {
            setLaunchpad(fetchedLaunchpad);
        }
    }, [fetchedLaunchpad, setLaunchpad]);

    if (isLoading) {
        return (
            <div className="center-loader">
                <Loader />
            </div>
        );
    }

    if (isError || !launchpad) {
        return (
            <Text align="center" mt="xl" color="red">
                Failed to load launchpad details. Please try again later.
            </Text>
        );
    }

    return (
        <div>
            <Header />
            <section className="sectioncontainer">
                <div>
                    <Group className="group-container">
                        <div className="section-item">
                            <Text className="section-label">NAME</Text>
                            <Text className="section-title">{launchpad?.name}</Text>
                        </div>
                        <div className="section-item">
                            <Text className="section-label">FULL NAME</Text>
                            <Text className="section-title">{launchpad?.full_name}</Text>
                        </div>
                        <div className="section-item">
                            <Text className="section-label">LOCATION</Text>
                            <Text className="section-title">
                                {launchpad?.locality}, {launchpad?.region}
                            </Text>
                        </div>
                        <div className="section-item">
                            <Text className="section-label">STATUS</Text>
                            <Text className="section-title">{launchpad?.status}</Text>
                        </div>
                    </Group>

                    <div className="main-menu">
                        <div className="content-section">
                            <Text className="content-description">
                                {launchpad?.details || "No details available for this launchpad."}
                            </Text>

                            <div className="card-section">
                                <Card shadow="sm" padding="lg" radius="lg" withBorder >
                                    <CardSection withBorder bg={"#111B52"} className="card-sub-section">
                                        <Text size="lg" weight={700} color="#FFFFFF" >
                                            Coordinates
                                        </Text>
                                        <Text size="sm" color="#FFFFFF">
                                            Latitude: {launchpad?.latitude || 'N/A'}
                                        </Text>
                                        <Text size="sm" color="#FFFFFF">
                                            Longitude: {launchpad?.longitude || 'N/A'}
                                        </Text>
                                        <Text size="sm" color="#FFFFFF">
                                            Timezone: {launchpad?.timezone || 'N/A'}
                                        </Text>
                                    </CardSection>
                                </Card>

                                <Card shadow="sm" padding="lg" radius="lg" withBorder mt={20}>
                                    <CardSection withBorder bg={"#111B52"} className="card-sub-section">
                                        <Text size="lg" weight={700} color="#FFFFFF">
                                            Launch Statistics
                                        </Text>
                                        <Text size="sm" color="#FFFFFF">
                                            Attempts: {launchpad?.launch_attempts || 'N/A'}
                                        </Text>
                                        <Text size="sm" color="#FFFFFF">
                                            Successes: {launchpad?.launch_successes || 'N/A'}
                                        </Text>
                                    </CardSection>
                                </Card>
                            </div>

                            <Title size={26} color={"#FFFFFF"} className="section-title" mt="xl">
                                Related Launches
                            </Title>
                            <div className="related-launches">
                                {launchpad.launches?.length > 0 ? (
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th className="launch-head">Name</th>
                                                <th className="launch-head">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {launchpad.launches.map((launch: Launch, index: number) => (
                                                <tr
                                                    key={index}
                                                    className="launch-row" >
                                                    <td>{launch?.name}</td>
                                                    <td>
                                                        {launch?.date_local
                                                            ? new Intl.DateTimeFormat("en-US", {
                                                                day: "2-digit",
                                                                month: "long",
                                                                year: "numeric",
                                                            }).format(new Date(launch?.date_local)).replace(",", "")
                                                            : "No date available"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <Text>No related launches found.</Text>
                                )}
                            </div>
                        </div>

                        <div className="image-section">
                            {launchpad?.images?.large?.length > 0 ? (
                                <div>
                                    {launchpad?.images?.large.map((image: string, index: number) => (
                                        <div key={index}>
                                            <Image
                                                src={image}
                                                alt={`Launchpad Image ${index + 1}`}
                                                radius="md"
                                                withPlaceholder
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Text>No images available for this launchpad.</Text>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LaunchpadDetails;
