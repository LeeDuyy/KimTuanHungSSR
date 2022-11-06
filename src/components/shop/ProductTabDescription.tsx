import { Specification } from '../../models/product';

interface ProductTabDescriptionProps {
    descriptions: string,
    specifications: Specification[]
}

function ProductTabDescription(props: ProductTabDescriptionProps) {
    const {
        descriptions,
        specifications,
    } = props;

    let sections;

    if (specifications != null) {
        sections = specifications.map((section, index) => {
            const features = section.subs.map((feature, index) => (
                <div key={index} className="spec__row">
                    <div className="spec__name">{feature.attribute}</div>
                    <div className="spec__value">{feature.value}</div>
                </div>
            ));

            return (
                <div key={index} className="spec__section">
                    <h4 className="spec__section-title">{section.group_name}</h4>
                    {features}
                </div>
            );
        });
    }

    return (
        <div className="typography">
            <h3>Thông số kỹ thuật</h3>
            {sections}
            <h3>Mô tả chi tiết</h3>
            <div dangerouslySetInnerHTML={{ __html: descriptions }} />
        </div>
    );
}

export default ProductTabDescription;
