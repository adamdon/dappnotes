export default
{
    name: "ContainerContent",

    props:
        {
            desktop: String
        },

    template: `
        <div :class="['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12', desktop]" > <!-- col start  -->

            <div class="content-container-fluid">
                <slot></slot>
            </div>

        </div> <!-- col end  -->
  `,
};