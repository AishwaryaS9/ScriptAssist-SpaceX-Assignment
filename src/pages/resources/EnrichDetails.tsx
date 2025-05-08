import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardSection, Group, Image, Loader, Text } from '@mantine/core';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Carousel } from '@mantine/carousel';
import { LuDiameter } from "react-icons/lu";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { RiWeightLine } from "react-icons/ri";
import Header from '../../components/Header';
import { useEnrichLaunchData } from '../../api/resourceApi';
import { useRocketStore } from '../../store/app.store';
import '../../styles/enrichDetails.scss';
import { PayloadWeights } from '../../utils/interface';

const EnrichDetails = () => {
    const { id } = useParams();
    const { setRocketDetails, rocketDetails } = useRocketStore();

    const { data, isLoading, error } = useEnrichLaunchData(id!);

    useEffect(() => {
        if (data) {
            setRocketDetails(data);
        }
    }, [data, setRocketDetails]);

    if (isLoading) {
        return (
            <div className="center-loader">
                <Loader />
            </div>
        );
    }

    if (error || !data) {
        console.error("Error or No Data:", error);
        return <Text align="center" mt="xl">Failed to load rocket details</Text>;
    }

    return (
        <div>
            <Header />
            <section className='sectioncontainer'>
                <div>
                    <Group className='group-container' >
                        <div className='section-item'>
                            <Text className='section-label'>NAME</Text>
                            <Text className='section-label'>{rocketDetails?.name}</Text>
                        </div>

                        <div className='section-item'>
                            <Text className='section-label'>TYPE</Text>
                            <Text className='section-title'>{rocketDetails?.type}</Text>
                        </div>

                        <div className='section-item'>
                            <Text className='section-label'>COUNTRY</Text>
                            <Text className='section-label'>{rocketDetails?.country}</Text>
                        </div>

                        <div className='section-item'>
                            <Text className='section-label'>STATUS</Text>
                            {rocketDetails?.active === true ? (
                                <Text className='section-label'>Active</Text>
                            ) : (
                                <Text className='section-label'>Inactive</Text>
                            )}
                        </div>

                        <div className='section-item'>
                            <Text className='section-label'>STAGES</Text>
                            <Text className='section-label'>{rocketDetails?.stages}</Text>
                        </div>

                        <div className='section-item'>
                            <Text className='section-label'>COMPANY</Text>
                            <Text className='section-label'>{rocketDetails?.company}</Text>
                        </div>
                    </Group>

                    <div className='main-menu'>
                        {/* Side Menu */}
                        <div className='side-menu'>
                            <LuDiameter className='diameter-icon'
                                data-tooltip-id="diameter-tooltip"
                                data-tooltip-content="Diameter"
                            />
                            <Tooltip id="diameter-tooltip" />
                            <Text className='side-menu-text'>
                                {rocketDetails?.diameter?.meters} meters
                            </Text>

                            <TbArrowAutofitHeight className='side-menu-icons'
                                data-tooltip-id="height-tooltip"
                                data-tooltip-content="Height"
                            />
                            <Tooltip id="height-tooltip" />
                            <Text className='side-menu-text'>
                                {rocketDetails?.height?.meters} meters
                            </Text>

                            <RiWeightLine className='side-menu-icons'
                                data-tooltip-id="mass-tooltip"
                                data-tooltip-content="Mass"
                            />
                            <Tooltip id="mass-tooltip" />
                            <Text className='side-menu-text'>
                                {rocketDetails?.mass?.kg} kg
                            </Text>
                        </div>

                        <div className='content-section'>
                            <Text className='content-description' >
                                {rocketDetails?.description}
                            </Text>

                            <div className='card-stage' >
                                <Card className='sub-card-stage'
                                    shadow="sm"
                                    padding="lg"
                                    radius="lg"
                                    withBorder >
                                    <CardSection withBorder className='card-section' >
                                        <Text size="lg" weight={700} color="#FFFFFF">
                                            First Stage
                                        </Text>
                                        <div className='card-sub-sections' >
                                            <Text size="sm" color="#FFFFFF">
                                                Engines:
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.first_stage?.engines}
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Fuel Amount (in tons):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.first_stage?.fuel_amount_tons}
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Burn Time (in seconds):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.first_stage?.burn_time_sec || "N/A"}
                                            </Text>
                                        </div>
                                    </CardSection>
                                </Card>

                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="lg"
                                    withBorder
                                    className='sub-card-stage'
                                >
                                    <CardSection withBorder className='card-section'>
                                        <Text size="lg" weight={700} color="#FFFFFF">
                                            Second Stage
                                        </Text>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Engines:
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.second_stage?.engines}
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Fuel Amount (in tons):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.second_stage?.fuel_amount_tons}
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Burn Time (in seconds):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.second_stage?.burn_time_sec || "N/A"}
                                            </Text>
                                        </div>
                                    </CardSection>
                                </Card>

                                <Card shadow="sm" padding="lg"
                                    radius="lg" withBorder
                                    className='sub-card-stage' >
                                    <CardSection withBorder className='card-section'>
                                        <Text size="lg" weight={700} color="#FFFFFF">
                                            Engines
                                        </Text>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Type:
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.engines?.type}
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Version:
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.engines?.version}
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                ISP (Sea Level):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.engines?.isp?.sea_level || "N/A"} sec
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                ISP (Vacuum):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.engines?.isp?.vacuum || "N/A"} sec
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Thrust (Sea Level):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.engines?.thrust_sea_level?.kN || "N/A"} kN
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Thrust (Vacuum):
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.engines?.thrust_vacuum?.kN || "N/A"} kN
                                            </Text>
                                        </div>
                                        <div className='card-sub-sections'>
                                            <Text size="sm" color="#FFFFFF">
                                                Propellants:
                                            </Text>
                                            <Text size="sm" color="#FFFFFF">
                                                {rocketDetails?.engines?.propellant_1 || "N/A"} /{" "}
                                                {rocketDetails?.engines?.propellant_2 || "N/A"}
                                            </Text>
                                        </div>
                                    </CardSection>
                                </Card>
                            </div>

                            <div className='wikipedia-section' >
                                <Text size="md" color="#FFFFFF">
                                    Wikipedia:&nbsp;
                                </Text>
                                <a href={rocketDetails?.wikipedia}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='wikipedia-link'>
                                    {rocketDetails?.wikipedia}
                                </a>
                            </div>
                        </div>

                        <div className='image-carousel-section' >
                            {rocketDetails?.flickr_images && rocketDetails?.flickr_images.length > 0 ? (
                                <Carousel withIndicators
                                    height="500px" slideSize="100%"
                                    slideGap="md" align="center" loop  >
                                    {rocketDetails?.flickr_images.map((image: string, index: number) => (
                                        <Carousel.Slide key={index}>
                                            <Image
                                                src={image}
                                                alt={`Rocket Image ${index + 1}`}
                                                caption={`Rocket Image ${index + 1}`}
                                                radius="md"
                                                withPlaceholder
                                            />
                                        </Carousel.Slide>
                                    ))}
                                </Carousel>
                            ) : (
                                <div className='no-image-section' >
                                    No images available for this rocket.
                                </div>
                            )}

                            <div className='detail-section'>
                                <Text size="lg" weight={700} className='detail-section-title'>
                                    Payload Weights
                                </Text>
                                <div className='detail-sub-section' >
                                    {rocketDetails?.payload_weights.map((item: PayloadWeights, index: number) => (
                                        <div key={index} className='detail-sub-content-section'>
                                            <Text size="md" weight={600} color='#FFFFFF'>
                                                {item.name}
                                            </Text>
                                            <Text size="sm" color='#AAAAAA' >
                                                {item.kg} kg / {item.lb} lb
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='detail-section' >
                                <Text size="lg" weight={700} className='detail-section-title'>
                                    Landing Legs
                                </Text>
                                <div className='detail-section-content'>
                                    <Text size="md" weight={600} color='#FFFFFF'>
                                        Number of Legs
                                    </Text>
                                    <Text size="sm" color='#AAAAAA' >
                                        {rocketDetails?.landing_legs?.number || 'N/A'}
                                    </Text>

                                    <Text size="md" weight={600} color='#FFFFFF'>
                                        Material
                                    </Text>
                                    <Text size="sm" color='#AAAAAA' className='text-style'>
                                        {rocketDetails?.landing_legs?.material || 'N/A'}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default EnrichDetails;
