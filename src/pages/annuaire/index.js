import Head from 'next/head';

import { Favicon } from '@/components/Favicon';
import { Footer } from '@/components/Footer';
import { Menu } from '@/components/Menu';
import { OrganizationListItem } from '@/components/organisations/ListItem';

const API_URL = process.env.API_URL;

export async function getServerSideProps() {
    const organizations = await fetch(`${API_URL}/organizations?perPage=100`).then(apiResponse => apiResponse.json());

    return {
        props: { organizations },
    };
}

export default function Organizations({ organizations }) {
    return (
        <div className="container">
            <Head>
                <title>Les stuctures liées au numérique dans le Calvados</title>
                <Favicon />
            </Head>
            <Menu />
            <main className="main">
                <h1 className="title">Les stuctures liées au numérique dans le Calvados</h1>

                <p className="description">Liste avec filtres</p>
                <ul>
                    {organizations.map(organization => (
                        <OrganizationListItem key={organization.identifier} organization={organization} />
                    ))}
                </ul>
            </main>

            <Footer />
        </div>
    );
}
