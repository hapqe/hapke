<script>
    import Project from "$lib/components/Project.svelte";
</script>

<h2>Projects</h2>

<div id="wrapper">
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
    <Project src="ferris.jpg">Dystopic Ferris Wheel</Project>
</div>

<style>
    #wrapper {
        perspective: 300px;

        pointer-events: auto;
        display: flex;
        justify-content: space-around;
        gap: 5rem;

        flex-wrap: wrap;

        padding: 3rem;
    }
</style>